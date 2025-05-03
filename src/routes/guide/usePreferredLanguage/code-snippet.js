export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useNow } from "@dimaslz/svelteuse";
</script>

<!-- html -->
<div>
	<pre>{$now}</pre>
</div>
`;

export const sourceCode = `import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

import { useIntervalFn } from "@/hooks/useIntervalFn";

export function useNow(): Writable<Date> {
	const now = writable(new Date());

	const update = () => { now.set(new Date()) }

	useIntervalFn(update, 1000, { immediate: true });

	return now;
}
`;
