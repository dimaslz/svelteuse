export default `
<!-- javascript -->
<script lang="ts">
import { useScreen } from "@/hooks";

const screen = useScreen();
</script>

<!-- html -->
<div>
	The current window dimensions are:
	<code>
		{JSON.stringify({ width: $screen?.width, height: $screen?.height })}
	</code>
</div>
`;
