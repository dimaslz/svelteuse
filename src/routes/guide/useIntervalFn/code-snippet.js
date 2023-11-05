export default `
<!-- javascript -->
<script lang="ts">
	import { useIntervalFn, useState } from "@dimaslz/svelteuse";

	const [counter, updateCounter] = useState<number>(0);
	useIntervalFn(() => {
		updateCounter((prevValue) => prevValue + 1);
	}, 200);
</script>

<!-- html -->
<div>
	<p>
		Update number every 200ms is <code>{$counter}</code>
	</p>
</div>

`;
