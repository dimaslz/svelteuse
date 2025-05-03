<script lang="ts">
	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";
	import { onMount } from "svelte";

	import { exampleCode, sourceCode } from "./code-snippet";
	import { useOrientation } from "@/hooks";

	const orientation = useOrientation();
</script>

<DocTpl title="useOrientation">
	<div slot="description">
		<p>Manage and respond to changes in device orientation with useOrientation.</p>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks.com/useorientation" target="_blank"
					>https://usehooks.com/useorientation</Link
				>
			</li>
			<li>
				<Link href="https://vueuse.org/core/useScreenOrientation" target="_blank"
					>https://vueuse.org/core/useScreenOrientation</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				<p>Angle: {$orientation.angle}</p>
				<p>Type: {$orientation.type}</p>
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
