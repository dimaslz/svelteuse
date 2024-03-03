import { useState } from "@/hooks";

export type MapOrEntries<K, V> = Map<K, V> | [K, V][];

// Public interface
export interface Actions<K, V> {
	add: (key: K, value: V) => void;
	set: (entries: MapOrEntries<K, V>) => void;
	remove: (key: K) => void;
	reset: Map<K, V>["clear"];
}

// We hide some setters from the returned map to disable autocompletion
type Return<K, V> = {
	map: SvelteStore<Omit<Map<K, V>, "set" | "clear" | "delete">>;
	actions: Actions<K, V>;
};

export function useMap<K, V>(initialState: MapOrEntries<K, V> = new Map()): Return<K, V> {
	const [map, setMap] = useState(new Map(initialState));

	const actions: Actions<K, V> = {
		add: (key, value) => {
			setMap((prev) => {
				const copy = new Map(prev);
				copy.set(key, value);
				return copy;
			});
		},

		set: (entries) => {
			setMap(() => new Map(entries));
		},

		remove: (key) => {
			setMap((prev) => {
				const copy = new Map(prev);
				copy.delete(key);
				return copy;
			});
		},

		reset: () => {
			setMap(() => new Map());
		},
	};

	return { map, actions };
}
