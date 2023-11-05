export default `
<!-- javascript -->
<script lang="ts">
	import { useToggle } from "@dimaslz/svelteuse";

	const [value, toggle, setValue] = useToggle();

	const customToggle = () => {
		setValue(!get(value));
	};
</script>

<!-- html -->
<div>
	<div>
		<p>
			Value <code>{$value}</code>
		</p>
	</div>

	<div>
		<button on:click={toggle}>toggle value</button>
		<button on:click={customToggle}>custom toggle</button>
	</div>
</div>

`;
