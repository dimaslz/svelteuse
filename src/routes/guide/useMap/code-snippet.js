export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { get } from "svelte/store";
	import { type MapOrEntries, useMap } from "@dimaslz/svelteuse";

	const initialValues: MapOrEntries<string, string> = [["key", "🆕"]];
	const otherValues: MapOrEntries<string, string> = [
		["hello", "👋"],
		["data", "📦"],
	];

	const { map, actions } = useMap<string, string>(initialValues);

	let arrayValue = Array.from(get(map).entries());

	map.subscribe((newMap) => {
		arrayValue = Array.from(newMap.entries());
	});

	const set = () => actions.add(String(Date.now()), "📦");
	const setAll = () => actions.set(otherValues);
	const reset = () => actions.reset();
	const remove = () => actions.remove("hello");
</script>

<!-- html -->
<div>
	<button on:click={set}>Add</button>
	<button on:click={reset}>Reset</button>
	<button on:click={setAll}>Set new data</button>
	<button on:click={remove} disabled={!$map.get("hello")}>
		{'Remove "hello"'}
	</button>

	<pre>{JSON.stringify(arrayValue, null, 2)}</pre>
	<pre>
		{#each arrayValue as value, index}
			<code>{\`\n  \${index}: \${value}\`}</code>
		{/each}
		<br />
	</pre>
</div>
`;

export const sourceCode = `
import { useState } from "@dimaslz/svelteuse"

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
`;
