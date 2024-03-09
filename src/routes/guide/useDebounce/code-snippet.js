export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useDebounce } from "@dimaslz/svelteuse";

	const [state, updateState] = useDebounce("", 200);
	let value: string = "";

	const onInput = () => {
		updateState(value);
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
	<div>
		<input bind:value on:input={onInput} />
	</div>
</div>
`;

export const sourceCode = `
import { useState } from "@dimaslz/svelteuse"

type Fn<T> = () => T;
type NewValue<T> = Fn<T> | T;

type Return<T> = (f: Fn<T> | T) => void;

export function useDebounce<T = string>(
	value: NewValue<T>,
	delay: number = 1000,
): [SvelteStore<T>, Return<T>] {
	const [state, setValue] = useState<T>((value || "") as T);

	let timeout: number;

	function setDebouncedValue(newValue: NewValue<T>): void {
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			setValue(typeof newValue === "function" ? (newValue as () => T)() : (newValue as T));
		}, delay);
	}

	return [state, setDebouncedValue];
}
`;
