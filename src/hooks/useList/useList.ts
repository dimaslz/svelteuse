import { writable } from "svelte/store";

export function useList<T>(defaultList: T[] = []) {
	const list = writable<T[]>(defaultList);

	function set(newList: T[]) {
		list.set(newList);
	}

	function push(element: T) {
		list.update((l) => [...l, element]);
	}

	function removeAt(index: number) {
		list.update((l) => [...l.slice(0, index), ...l.slice(index + 1)]);
	}

	function insertAt(index: number, element: T) {
		list.update((l) => [...l.slice(0, index), element, ...l.slice(index)]);
	}

	function updateAt(index: number, element: T) {
		list.update((l) => l.map((e, i) => (i === index ? element : e)));
	}

	function clear() {
		list.set([]);
	}

	return {
		list,
		set,
		push,
		removeAt,
		insertAt,
		updateAt,
		clear,
	};
}
