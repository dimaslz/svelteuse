<script lang="ts">
	import { useWindowSize } from "@/hooks";

	const { windowSize } = useWindowSize({ intoComponent: true });
</script>

<div>
	<div>width: {$windowSize.width}</div>
	<div>height: {$windowSize.height}</div>
</div>
