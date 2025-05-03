export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { writable } from 'svelte/store';

	import { usePrevious } from "@dimaslz/svelteuse";

	const count = writable(0);
	const prevCount = usePrevious(count);

	function increment() {
		count.update(n => n + 1);
	}
</script>

<!-- html -->
<div>
	<button on:click={increment}>Increment</button>
	<p>Current: {$count}</p>
	<p>Previous: {$prevCount}</p>
</div>
`;

export const sourceCode = `import { derived, type Readable } from 'svelte/store';

export function usePrevious<T>(store: Readable<T>): Readable<T | null> {
	let previous: T | null = null;

	return derived(store, ($value, set) => {
		set(previous);
		previous = $value;
	}, null);
}
`;
