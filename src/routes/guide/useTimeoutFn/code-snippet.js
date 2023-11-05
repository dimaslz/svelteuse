export default `
<!-- javascript -->
<script lang="ts">
	import { updateCounter, useState } from "@dimaslz/svelteuse";

	const [counter, updateCounter] = useState<number>(0);

	useTimeoutFn(() => {
		updateCounter((prevValue) => prevValue + 1);
	}, 2000);
</script>

<!-- html -->
<div>
	<p>
		Update number after 2 seconds: <code>{$counter}</code>
	</p>
</div>

`;
