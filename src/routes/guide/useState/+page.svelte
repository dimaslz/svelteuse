<script lang="ts">
	import { Button } from "@/components";
	import { useState } from "@/hooks";

	const [state, setState] = useState<number>(0);

	const updateState = () => {
		const newValue = $state + 1;
		setState(newValue);
	};
	const updateStateByFn = () => {
		setState((prev) => prev + 1);
	};
</script>

<div class="w-full">
	<h1 class="text-4xl">useState</h1>

	<div class="p-4 bg-gray-950/50 mt-6">
		<p>
			Value is <code>{$state}</code>
		</p>
		<Button on:click={updateState}>update state</Button>
		<Button on:click={updateStateByFn}>update by function</Button>
	</div>
</div>
