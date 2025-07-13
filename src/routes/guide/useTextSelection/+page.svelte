<script lang="ts">
	import { Link, Browser, DocTpl, H2, Highlight } from "@/components";

	import { exampleCode, sourceCode } from "./code-snippet";
</script>

<DocTpl title="useTextSelection">
	<div slot="description">
		<p>Listen any event from a element.</p>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://vueuse.org/core/useTextSelection"
				>https://vueuse.org/core/useTextSelection</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50 h-96">
		  <iframe
  			src="/demos/use-text-selection"
  			frameborder="0"
  			width="100%"
  			height="100%"
  			title="useTextSelection Demo"
  		/>
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
