import { useState } from "..";

export function useToggle(defaultValue?: boolean): {
	value: SvelteStore<boolean>;
	toggle: () => void;
	update: (b: boolean) => void;
} {
	const [value, update] = useState(!!defaultValue);

	const toggle = () => update((x) => !x);

	return { value, toggle, update };
}
