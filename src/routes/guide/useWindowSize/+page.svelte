<script lang="ts">
	import { Browser, DocTpl, H2, Highlight } from "@/components";
	import { useWindowSize } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	const { windowSize } = useWindowSize();
</script>

<DocTpl title="useWindowSize">
	<div slot="description">
		<p>Listen the size of the window.</p>
	</div>

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
		<div>
			<H2>Code base</H2>

			<Highlight language="typescript" code={sourceCode} />
		</div>

		<div class="mt-12">
			<H2>Code example</H2>

			<Highlight code={exampleCode} />
		</div>
	</div>
</DocTpl>
