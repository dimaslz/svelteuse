export default `
<!-- javascript -->
<script lang="ts">
	import { onMount } from "svelte";
	import { useWindowSize } from "@dimaslz/svelteuse";

	const { windowSize, removeEvent } = useWindowSize();

	onMount(() => {
		return () => {
			removeEvent();
		};
	});
</script>

<!-- html -->
<div>
	The current window dimensions are:{" "}
	<code>{JSON.stringify({ width: $windowSize.width, height: $windowSize.height })}</code>
</div>

`;
