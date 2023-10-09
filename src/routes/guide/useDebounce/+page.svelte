<script lang="ts">
	import { useDebounce } from "@/hooks";

	const [state, updateState] = useDebounce("", 200);
	let value: string = "";

	const onInput = () => {
		updateState(value);
	};
</script>

<div class="w-full">
	<h1 class="text-4xl">useDebounce</h1>

	<div class="mt-4 space-y-4">
		<div class="p-4 bg-gray-950/50">
			<p>
				<span class="font-bold">sync value:</span> <code>{value}</code>
			</p>
			<p>
				<span class="font-bold">debounced value:</span> <code>{$state}</code>
			</p>
		</div>

		<div>
			<input
				bind:value
				on:input={onInput}
				class="rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:focus:ring-offset-2 dark:focus:ring-offset-gray-900"
			/>
		</div>
	</div>
</div>
