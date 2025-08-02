import { derived, type Readable } from "svelte/store";

export function usePrevious<T>(store: Readable<T>): Readable<T | null> {
	let previous: T | null = null;

	return derived(
		store,
		($value, set) => {
			set(previous);
			previous = $value;
		},
		null,
	);
}
