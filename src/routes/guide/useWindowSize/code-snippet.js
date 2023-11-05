export default `
<!-- javascript -->
<script lang="ts">
	import { useWindowSize } from "@dimaslz/svelteuse";

	const windowSize = useWindowSize();
</script>

<!-- html -->
<div>
	The current window dimensions are:{" "}
	<code>{JSON.stringify({ width: $windowSize.width, height: $windowSize.height })}</code>
</div>

`;
