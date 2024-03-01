import { writable } from "svelte/store";

export function useReducer<T>(initialValue: T) {
	const store = writable(initialValue);
}
