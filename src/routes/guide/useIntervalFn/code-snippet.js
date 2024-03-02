export default `
<!-- javascript -->
<script lang="ts">
	import { useIntervalFn, useState } from "@dimaslz/svelteuse";

	const [counter, updateCounter] = useState<number>(0);
	const { isActive, pause, resume } = useIntervalFn(() => {
		// here excecute the code as you need
		updateCounter((prevValue) => prevValue + 1);
	}, 200);
</script>

<!-- html -->
<div>
	<p>
		Update number every 200ms is <code>{$counter}</code>
	</p>
	<p>
		is active: {$isActive}
	</p>

	<div>
		<button on:click={pause}>pause</button>
		<button on:click={resume}>resume</button>
	</div>
</div>

`;
