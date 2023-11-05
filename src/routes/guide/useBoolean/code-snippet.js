export default `
<!-- javascript -->
<script lang="ts">
	import { useBoolean } from "@dimaslz/svelteuse";

	const { value, setValue, setTrue, setFalse, toggle } = useBoolean();

	const customToggle = () => {
		setValue(!get(value));
	};
</script>

<!-- html -->
<div>
	<p>
		Value <code>{$value}</code>
	</p>

	<div>
		<button on:click={setTrue}>set true</button>
		<button on:click={setFalse}>set false</button>
		<button on:click={toggle}>toggle value</button>
		<button on:click={customToggle}>custom toggle</button>
	</div>
</div>
`;
