export default `
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
