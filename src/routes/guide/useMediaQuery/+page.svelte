<script lang="ts">
	import { onMount } from "svelte";

	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";
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
	<div slot="description">
		<p>
			Manage <code>Map</code> easily with this hook.
		</p>

		<h3 class="text-lg">Related hooks:</h3>
		<ul class="list-disc pl-6">
			<li><Link href="/guide/useState">useState</Link></li>
		</ul>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks.com/usemediaquery" target="_blank"
					>https://usehooks.com/usemediaquery</Link
				>
			</li>
			<li>
				<Link href="https://usehooks-ts.com/react-hook/use-media-query" target="_blank"
					>https://usehooks-ts.com/react-hook/use-media-query</Link
				>
			</li>
			<li>
				<Link href="https://vueuse.org/core/useMediaQuery" target="_blank"
					>https://vueuse.org/core/useMediaQuery</Link
				>
			</li>
		</ul>
	</div>

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
