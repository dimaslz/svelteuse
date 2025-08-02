<script lang="ts">
	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";

	// example
	import { exampleCode, sourceCode } from "./code-snippet";
</script>

<DocTpl title="useThrottledHistory">
	<div slot="description">
		<div class="space-y-2">
			<p>Add undo / redo functionality like useHistory but with history throttled.</p>

			<h3 class="text-lg">Related hooks:</h3>
			<ul class="list-disc pl-6">
				<li><Link href="/guide/useHistory">useHistory</Link></li>
			</ul>

			<h3 class="text-lg">Inspired on:</h3>
			<ul class="list-disc pl-6">
				<li>
					<Link href="https://vueuse.org/core/useThrottledRefHistory"
						>https://vueuse.org/core/useThrottledRefHistory</Link
					>
				</li>
			</ul>
		</div>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50 h-96">
			<iframe
				src="/demos/use-throttled-history"
				frameborder="0"
				width="100%"
				height="100%"
				title="useThrottledHistory Demo"
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
