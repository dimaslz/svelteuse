import { useState } from "@/hooks";

type Fn<T> = () => T;
type NewValue<T> = Fn<T> | T;

type Return<T> = (f: Fn<T> | T) => void;

export function useDebounce<T = string>(
	value: NewValue<T>,
	delay?: number,
): [SvelteStore<T>, Return<T>] {
	const [state, setValue] = useState<T>(value);

	let timeout: number;

	function setDebouncedValue(newValue: NewValue<T>): void {
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			setValue(typeof newValue === "function" ? (newValue as () => T)() : (newValue as T));
		}, delay);
	}

	return [state, setDebouncedValue];
}
