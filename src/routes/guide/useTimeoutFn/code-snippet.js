export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { updateCounter, useState } from "@dimaslz/svelteuse";

	const [counter, updateCounter] = useState<number>(0);

	useTimeoutFn(() => {
		updateCounter((prevValue) => prevValue + 1);
	}, 2000);
</script>

<!-- html -->
<div>
	<p>
		Update number after 2 seconds: <code>{$counter}</code>
	</p>
</div>
`;

export const sourceCode = `
import { onMount } from "svelte";

export function useTimeoutFn(
	callback: () => void,
	delay: number | undefined = 1000,
	cancelOnUnmount: boolean = true,
) {
	let savedCallback = callback;

	onMount(() => {
		savedCallback = callback;

		if (!delay && delay !== 0) {
			return;
		}

		const id = setTimeout(() => savedCallback(), delay);

		return () => {
			if (cancelOnUnmount) {
				clearTimeout(id);
			}
		};
	});
}
`;
