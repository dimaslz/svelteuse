export default `
<!-- javascript -->
<script lang="ts">
	import { onMount } from "svelte";
	import { useClickAnyWhere } from "@dimaslz/svelteuse";

	const someCallback = () => {
		console.log("click anywhere!");
	};

	onMount(() => {
		const eventClickAnyWhere = useClickAnyWhere(someCallback);

		return () => {
			eventClickAnyWhere();
		}
	})
</script>

<!-- html -->
<div>
	content
</div>
`;
