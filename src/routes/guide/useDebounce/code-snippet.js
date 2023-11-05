export default `
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
