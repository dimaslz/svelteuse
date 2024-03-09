export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useThrottle } from "@dimaslz/svelteuse";

	let value: string = "";

	const [state, updateState] = useThrottle("", 500);

	const onInput = ($event: Event) => {
		const { value: _value } = $event.target as HTMLInputElement;

		updateState(_value);
	};
</script>

<!-- html -->
<div>
	<p>
		<span class="font-bold">throttled value:</span> <code>{$state}</code>
	</p>
	<p>
		<span class="font-bold">realtime value:</span> <code>{value}</code>
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

export function useThrottle<T = string>(
	_value: NewValue<T>,
	interval: number = 1000,
): [SvelteStore<T>, Return<T>] {
	const [value, updateValue] = useState<T>((_value || "") as T);

	let lastUpdated: number = 0;
	let id: number;

	const setThrottleValue = (newValue: NewValue<T>) => {
		const now = Date.now();
		if (now - lastUpdated < interval) {
			if (id) {
				clearTimeout(id);
			}

			id = setTimeout(() => {
				clearTimeout(id);
				updateValue(typeof newValue === "function" ? (newValue as () => T)() : (newValue as T));
			}, interval);

			return;
		}

		lastUpdated = now;
		return updateValue(typeof newValue === "function" ? (newValue as () => T)() : (newValue as T));
	};

	return [value, setThrottleValue];
}
`;
