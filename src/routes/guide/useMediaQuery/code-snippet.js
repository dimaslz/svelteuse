export default `
<!-- javascript -->
<script lang="ts">
	import { useMediaQuery } from "@dimaslz/svelte-hooks";

	const matches = useMediaQuery("(min-width: 768px)");
</script>

<!-- html -->
<div>
	<p>
		Value is <code>{JSON.stringify($matches)}</code>
	</p>
	<div>
		{\`The view port is \${$matches ? "at least" : "less than"} 768 pixels wide\`}
	</div>
</div>
`;
