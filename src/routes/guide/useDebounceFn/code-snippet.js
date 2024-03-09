export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useDebounceFn, useState } from "@dimaslz/svelteuse";

	let value: string = "";
	const [state, updateValue] = useState("");

	const fnUpdate = (value: string) => {
		updateValue(value);
	};

	const updateStateFn = useDebounceFn<string>(fnUpdate, 200);

	const onInput = ($event: Event) => {
		const { value } = $event.target as HTMLInputElement;

		updateStateFn(value);
	};
</script>

<!-- html -->
<div>
	<p>
		<span class="font-bold">sync value:</span> <code>{value}</code>
	</p>
	<p>
		<span class="font-bold">debounced value:</span> <code>{$state}</code>
	</p>

	<div class="w-full">
		<input bind:value on:input={onInput} />
	</div>
</div>
`;

export const sourceCode = `
export function useDebounceFn<Args extends unknown[], T = string>(
	fn: (...args: Args) => T,
	delay: number = 1000,
) {
	let timeout: number;

	function setDebouncedValue(...args: Args): void {
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			fn(...args);
		}, delay);
	}

	return setDebouncedValue;
}
`;
