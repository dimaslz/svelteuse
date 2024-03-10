<script lang="ts">
	import { onMount } from "svelte";

	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";
	import { useElementSize } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	const [setElementRef, elementSize, killInstance] = useElementSize();

	let elementRef: HTMLDivElement;

	onMount(() => {
		if (elementRef) {
			setElementRef(elementRef);
		}

		return () => {
			killInstance();
		};
	});
</script>

<DocTpl title="useElementSize">
	<div slot="description">
		<p>Listen the size of the element.</p>

		<h3 class="text-lg">Related hooks</h3>
		<ul class="list-disc pl-6">
			<li><Link href="/guide/useState">useState</Link></li>
		</ul>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks-ts.com/react-hook/use-element-size"
					>https://usehooks-ts.com/react-hook/use-element-size</Link
				>
			</li>
			<li>
				<Link href="https://vueuse.org/core/useElementSize/"
					>https://vueuse.org/core/useElementSize/</Link
				>
			</li>
			<li>
				<Link href="https://vueuse.org/core/useResizeObserver"
					>https://vueuse.org/core/useResizeObserver</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>
		<Browser body="p-4 bg-gray-950/50">
			<p class="py-4">
				Element size are <code>{JSON.stringify($elementSize, null, 2)}</code>
			</p>
			<div id="some" bind:this={elementRef} class="border overflow-auto resize">
				<h1>This is the element</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque doloribus nemo porro
					doloremque, esse delectus enim reprehenderit quisquam, odio obcaecati officia adipisci
					expedita nostrum ex natus praesentium quos accusamus dolore!
				</p>
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
