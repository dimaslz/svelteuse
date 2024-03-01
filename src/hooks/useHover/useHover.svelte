<script lang="ts">
	import { onMount } from "svelte";

	import { useHover } from "@/hooks";

	export let onEnter: (() => void) | null = null;
	export let onLeave: (() => void) | null = null;

	let hoverRef: HTMLElement;
	const [isHover, setElement] = useHover({
		onEnter,
		onLeave,
	});

	onMount(() => {
		setElement(hoverRef);
	});
</script>

<div data-testid="element-to-hover" bind:this={hoverRef}>
	<div>{$isHover ? "is hover" : "is not hover"}</div>
</div>
