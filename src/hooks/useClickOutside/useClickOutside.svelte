<script lang="ts">
	import { onMount } from "svelte";

	import { useClickOutside } from "@/hooks";

	export let onClick: () => void;
	let element: HTMLElement;

	const { removeListener, setElementRef } = useClickOutside({ handler: onClick, component: true });

	onMount(() => {
		setElementRef(element);

		return () => {
			removeListener();
		};
	});
</script>

<div class="w-full h-32">
	<div bind:this={element}>hello</div>
</div>
