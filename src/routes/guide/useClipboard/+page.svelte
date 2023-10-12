<script lang="ts">
	import { Button } from "@/components";
	import { useClipboard } from "@/hooks";

	const [clipboard, copyClipboard] = useClipboard();

	let textarea: HTMLTextAreaElement;
	const onClickTextarea = () => {
		copyClipboard(textarea.value);
	};

	const onClickReset = () => {
		copyClipboard("");
	};
</script>

<div class="w-full">
	<h1 class="text-4xl">useClipboard</h1>

	<div class="mt-4 space-y-4">
		<div class="p-4 bg-gray-950/50">
			<p>
				<span class="font-bold">clipboard content:</span> <code>{$clipboard || "empty"}</code>
			</p>
		</div>

		<div class="flex items-center space-x-4">
			<textarea
				bind:this={textarea}
				value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
				class="rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:focus:ring-offset-2 dark:focus:ring-offset-gray-900 w-full h-48"
			/>
			<div>
				<Button on:click={onClickTextarea}>copy to clipboard</Button>
				<Button on:click={onClickReset}>reset</Button>
			</div>
		</div>
	</div>
</div>
