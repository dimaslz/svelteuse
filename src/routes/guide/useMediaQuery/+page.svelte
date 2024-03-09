<script lang="ts">
	import { onMount } from "svelte";

	import { Browser, DocTpl, H2, Highlight } from "@/components";
	import { useMediaQuery } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	const { matches, unsubscribe } = useMediaQuery("(min-width: 768px)");

	onMount(() => {
		return () => {
			unsubscribe();
		};
	});
</script>

<DocTpl title="useMediaQuery">
	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<p>
				It this view matches with the current viewport?: <code>{JSON.stringify($matches)}</code>
			</p>
			<div>
				{`The view port is ${$matches ? "at least" : "less than"} 768 pixels wide`}
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
