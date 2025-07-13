<script lang="ts">
	import { Browser, DocTpl, H2, Link } from "@/components";

	import { useMeasure } from "@/hooks";

	// example
	const { element, dimensions } = useMeasure();
</script>

<DocTpl title="useMeasure">
	<div slot="description">
		<p>
			Effortlessly measure and track your component’s dimensions with useMeasure.
		</p>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks.com/usemeasure" target="_blank"
					>https://usehooks.com/usemeasure</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div class="p-4">
				<div
					use:element
					class="resize border-2 border-amber-600 p-4 overflow-auto"
				>
					{JSON.stringify($dimensions, null, 2)}
				</div>
			</div>
		</Browser>
	</div>

	<!-- <div slot="code-example">
		<div>
			<H2>Code base</H2>

			<Highlight language="typescript" code={sourceCode} />
		</div>

		<div class="mt-12">
			<H2>Code example</H2>

			<Highlight code={exampleCode} />
		</div>
	</div> -->
</DocTpl>
