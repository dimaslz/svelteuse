<script lang="ts">
	import { onMount } from "svelte";

	import { Browser, DocTpl, H2, Highlight } from "@/components";
	import { useElementSize } from "@/hooks";

	import code from "./code-snippet";

	const [setElementRef, elementSize] = useElementSize();

	let elementRef: HTMLDivElement;

	onMount(() => {
		if (elementRef) {
			setElementRef(elementRef);
		}
	});
</script>

<DocTpl title="useElementSize">
	<div slot="description">
		<p>
			The difference with <a
				href="/guide/useElementSizeObserver"
				class="text-[#ff3e00] underline hover:no-underline">useElementSizeObserver</a
			>, is that useElementSize does not activily listen the change of the element.
		</p>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<p class="py-4">
				Element size are <code>{JSON.stringify($elementSize, null, 2)}</code>
			</p>
			<div id="some" bind:this={elementRef} class="border">
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
		<H2>Code example</H2>

		<Highlight {code} />
	</div>
</DocTpl>
