export const demo = `

<!-- typescript -->
<script lang="ts">
	import { useState } from "@dimaslz/svelteuse";

	const [state, setState] = useState<number>(0);

	// option A: update state by direct value
	const updateState = () => {
		setState($state + 1);
	};

	// option B: update state by function with return value
	const updateStateByFn = () => {
		setState((prev) => prev + 1);
	};
</script>


<!-- html -->
<div>
	<p>
		Value is <code>{$state}</code>
	</p>

	<button on:click={updateState}>update state</button>
	<button on:click={updateStateByFn}>update by function</button>
</div>
`;
