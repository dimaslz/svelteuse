export default `
<!-- javascript -->
<script lang="ts">
	import { useState, useThrottleFn } from "@dimaslz/svelteuse";

	let value: string = "";
	const [state, setState] = useState(value);

	// the params here, are the same of possible params on throttledFunction(...)
	const updateState = (value: string) => {
		setState(value);
	};

	const throttledFunction = useThrottleFn(updateState, 500);

	const onInput = ($event: Event) => {
		const { value: _value } = $event.target as HTMLInputElement;

		// the possible params are the same of updateState(...)
		throttledFunction(_value);
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
