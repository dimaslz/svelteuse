export default `
<!-- javascript -->
<script lang="ts">
	import { useScript } from "@/hooks";

	const status = useScript("https://code.jquery.com/jquery-3.5.1.min.js", {
		removeOnUnmount: true,
	});
</script>

<!-- html -->
<div>
	<code>{$status}</code>
</div>
`;
