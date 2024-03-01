import { useState } from "..";

export function useToggle(
	defaultValue?: boolean,
): [SvelteStore<boolean>, () => void, (b: boolean) => void] {
	const [value, setValue] = useState(!!defaultValue);

	const toggle = () => setValue((x) => !x);

	return [value, toggle, setValue];
}
