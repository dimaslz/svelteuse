<script lang="ts">
	import { onMount } from "svelte";

	import { useElementSize } from "@/hooks";

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

<div>
	<div>
		<div>width: {$elementSize.width}</div>
		<div>height: {$elementSize.height}</div>
	</div>

	<div
		data-testid="element"
		bind:this={elementRef}
		class="border overflow-auto resize"
		style="width: 100px; height: 100px"
	>
		test
	</div>
</div>
