<script lang="ts">
	import { Browser, DocTpl, H2, Highlight } from "@/components";
	import { useWindowSize } from "@/hooks";

	import code from "./code-snippet";

	const windowSize = useWindowSize();
</script>

<DocTpl title="useWindowSize">
	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				The current window dimensions are:{" "}
				<code>{JSON.stringify({ width: $windowSize.width, height: $windowSize.height })}</code>
			</div>
		</Browser>
	</div>

	<div slot="code-example">
		<H2>Code example</H2>

		<Highlight {code} />
	</div>
</DocTpl>
