export default `
<!-- javascript -->
<script lang="ts">
	import { useHover } from "@dimaslz/svelteuse";

	let hoverRef: HTMLElement;
	const [isHover, setElement] = useHover();

	onMount(() => {
		setElement(hoverRef);
	});
</script>

<!-- html -->
<div>
	<p>
		isHover? <code>{$isHover}</code>
	</p>

	<div
		class={[
			"w-full h-24 flex items-center justify-center",
			$isHover ? "bg-gray-900" : "bg-gray-800",
		].join(" ")}
		bind:this={hoverRef}
	>
		<div class="text-gray-600">hover your mouse here</div>
	</div>
</div>
`;
