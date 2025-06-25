<script lang="ts">
	import { DocTpl, H2, Highlight, Link } from "@/components";

	import { exampleCode, sourceCode } from "./code-snippet";
</script>

<DocTpl title="useFavicon">
	<div slot="description">
		<p>Easily set or update the browser tab icon using the useFavicon hook.</p>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks.com/usefavicon" target="_blank"
					>https://usehooks.com/usefavicon</Link
				>
			</li>
			<li>
				<Link href="https://vueuse.org/core/useFavicon" target="_blank"
					>https://vueuse.org/core/useFavicon</Link
				>
			</li>
		</ul>
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
