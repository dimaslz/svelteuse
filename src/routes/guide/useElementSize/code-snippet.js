export default `
<!-- javascript -->
<script lang="ts">
	import { onMount } from "svelte";

	import { useElementSize } from "@dimaslz/svelteuse";

	const [setElementRef, elementSize, killInstance] = useElementSize();

	let elementRef: HTMLDivElement;

	onMount(() => {
		if (elementRef) {
			setElementRef(elementRef);
		}

		return () => {
			killInstance(); // kill event listener
		}
	});
</script>

<!-- html -->
<div class="w-full">
	<p>
		Element size are <code>{JSON.stringify($elementSize, null, 2)}</code>
	</p>
	<div id="some" bind:this={elementRef} class="border">
		<h1>This is the element</h1>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque doloribus nemo porro doloremque,
			esse delectus enim reprehenderit quisquam, odio obcaecati officia adipisci expedita nostrum ex
			natus praesentium quos accusamus dolore!
		</p>
	</div>
</div>

`;
