<script lang="ts">
	import { useScroll } from "@/hooks/useScroll/useScroll";

	const { scroll, trackScroll } = useScroll();
</script>

<div>isScrolling: {$scroll.isScrolling}</div>
<div>coordenades: {$scroll.x} - {$scroll.y}</div>

<div>top arrived: {$scroll.topArrived}</div>
<div>bottom arrived: {$scroll.bottomArrived}</div>
<div>left arrived: {$scroll.leftArrived}</div>
<div>right arrived: {$scroll.rightArrived}</div>

<div>direction top: {$scroll.directions.top}</div>
<div>direction bottom: {$scroll.directions.bottom}</div>
<div>direction left: {$scroll.directions.left}</div>
<div>direction right: {$scroll.directions.right}</div>

<div data-testid="container" use:trackScroll style="width: 200px; height: 200px; overflow: scroll;">
	<div style="width: 500px; height: 500px;" />
</div>
