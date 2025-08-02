<script lang="ts">
	import { useMouseInElement } from "./useMouseInElement";

	const [mouse, mouseTracker] = useMouseInElement();

	export let onUpdate = (mouse: any) => {};

	$: onUpdate($mouse);
</script>

<div
	data-testid="track-area"
	style="width: 100px; height: 100px; position: relative;"
	use:mouseTracker
>
	Mouse Position: {$mouse.x}, {$mouse.y}
</div>
