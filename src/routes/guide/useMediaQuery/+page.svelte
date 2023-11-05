<script lang="ts">
	import { Browser, DocTpl, H2, Highlight as HighlightSvelte } from "@/components";
	import { useMediaQuery } from "@/hooks";

	import code from "./code-snippet";

	const matches = useMediaQuery("(min-width: 768px)");
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
		<H2>Code example</H2>

		<HighlightSvelte {code} />
	</div>
</DocTpl>
