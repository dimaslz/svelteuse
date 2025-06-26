import { describe, it, expect } from 'vitest';
import { get } from 'svelte/store';
import { useList } from './useList';

describe('useList', () => {
	it('initializes with default list', () => {
		const { list } = useList([1, 2, 3]);
		expect(get(list)).toEqual([1, 2, 3]);
	});

	it('sets a new list', () => {
		const { list, set } = useList<number>();
		set([9, 8]);
		expect(get(list)).toEqual([9, 8]);
	});

	it('pushes a new item', () => {
		const { list, push } = useList<number>([1]);
		push(2);
		expect(get(list)).toEqual([1, 2]);
	});

	it('removes an item at index', () => {
		const { list, removeAt } = useList(['a', 'b', 'c']);
		removeAt(1);
		expect(get(list)).toEqual(['a', 'c']);
	});

	it('inserts an item at index', () => {
		const { list, insertAt } = useList(['a', 'c']);
		insertAt(1, 'b');
		expect(get(list)).toEqual(['a', 'b', 'c']);
	});

	it('updates an item at index', () => {
		const { list, updateAt } = useList([1, 2, 3]);
		updateAt(1, 99);
		expect(get(list)).toEqual([1, 99, 3]);
	});

	it('clears the list', () => {
		const { list, clear } = useList([1, 2]);
		clear();
		expect(get(list)).toEqual([]);
	});
});