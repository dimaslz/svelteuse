<script lang="ts">
	import { get } from "svelte/store";

	import { Button } from "@/components";
	import { useBoolean } from "@/hooks";

	const { value, setValue, setTrue, setFalse, toggle } = useBoolean();

	const customToggle = () => {
		setValue(!get(value));
	};
</script>

<div class="w-full">
	<h1 class="text-4xl">useBoolean</h1>

	<div class="mt-4 space-y-4">
		<!-- <div class="px-4 py-2 bg-gray-950/50 text-xs border-l-4 text-gray-400">
			<p>Just works with SvelteKit</p>
		</div> -->

		<div class="p-4 bg-gray-950/50">
			<p>
				Value <code>{$value}</code>
			</p>
		</div>

		<div>
			<Button on:click={setTrue}>set true</Button>
			<Button on:click={setFalse}>set false</Button>
			<Button on:click={toggle}>toggle value</Button>
			<Button on:click={customToggle}>custom toggle</Button>
		</div>
	</div>
</div>
