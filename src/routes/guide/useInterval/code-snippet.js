export default `
<!-- javascript -->
<script lang="ts">
	import { useIntervalFn, useState } from "@dimaslz/svelteuse";

	const counter = useInterval(200);
	const { isActive, state: counter2, reset, pause, resume } = useInterval(200, { controls: true });
</script>

<!-- html -->
<div>
	<p>
		Update number every 200ms without controls: <code>{$counter}</code>
	</p>

	<div>
		<p>
			Update number every 200ms with controls: <code>{$counter2}</code>
		</p>

		<p>
			is active: {$isActive}
		</p>

		<div>
			<Button on:click={pause}>pause</Button>
			<Button on:click={resume}>resume</Button>
			<Button on:click={reset}>reset</Button>
		</div>
	</div>
</div>

`;
