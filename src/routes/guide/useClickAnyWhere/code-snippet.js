export default `
<!-- javascript -->
<script lang="ts">
	import { useClickAnyWhere } from "@dimaslz/svelteuse";

	const someCallback = () => {
		console.log("click anywhere!");
	};

	useClickAnyWhere(someCallback);
</script>

<!-- html -->
<div>
	content
</div>
`;
