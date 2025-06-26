export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useList } from "@dimaslz/svelteuse";

	let input = '';

	const { list: todos, push, removeAt, clear } = useList<string>([]);
</script>

<!-- html -->
<div>
	<div class="flex w-96 h-12">
		<input bind:value={input} placeholder="Add todo" />
		<button on:click={() => { if (input) { push(input); input = ''; } }}>
			Add
		</button>
		<button on:click={clear}>Clear All</button>
	</div>

	{#if $todos.length === 0}
		<div class="p-4">no items on the list</div>
	{/if}

	{#if $todos.length > 0}
		<ul class="w-96 p-4">
			{#each $todos as todo, i}
				<li class="w-full flex items-center">
					<div class="w-full">{todo}</div>
					<button on:click={() => removeAt(i)}>Remove</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
`;

export const sourceCode = `import { writable } from 'svelte/store';

export function useList<T>(defaultList: T[] = []) {
	const list = writable<T[]>(defaultList);

	function set(newList: T[]) {
		list.set(newList);
	}

	function push(element: T) {
		list.update(l => [...l, element]);
	}

	function removeAt(index: number) {
		list.update(l => [...l.slice(0, index), ...l.slice(index + 1)]);
	}

	function insertAt(index: number, element: T) {
		list.update(l => [...l.slice(0, index), element, ...l.slice(index)]);
	}

	function updateAt(index: number, element: T) {
		list.update(l => l.map((e, i) => (i === index ? element : e)));
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
`;
