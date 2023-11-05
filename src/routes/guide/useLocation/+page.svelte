<script lang="ts">
	import { Browser, DocTpl, H2, Highlight } from "@/components";

	// import { useLocation } from "@/hooks";
	import code from "./code-snippet";

	// const location = useLocation();
</script>

<DocTpl title="useLocation">
	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">...</Browser>
	</div>

	<div slot="code-example">
		<H2>Code example</H2>

		<Highlight {code} />
	</div>
</DocTpl>
