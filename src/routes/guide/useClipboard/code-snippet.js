export const codeBase = `
import { useState } from "@/hooks";

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>;

type UseClipboardOutput = [SvelteStore<CopiedValue>, CopyFn];

export function useClipboard(): UseClipboardOutput {
	const [copiedText, setCopiedText] = useState<CopiedValue>(null);

	const copy: CopyFn = async (text) => {
		if (!navigator?.clipboard) {
			console.warn("Clipboard not supported");
			return false;
		}

		try {
			await navigator.clipboard.writeText(text);
			setCopiedText(text);

			return true;
		} catch (error) {
			console.warn("Copy failed", error);
			setCopiedText(null);

			return false;
		}
	};

	return [copiedText, copy];
}
`;

export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useClipboard } from "@dimaslz/svelteuse";

	const [clipboard, copyClipboard] = useClipboard();

	let textarea: HTMLTextAreaElement;
	const onClickTextarea = () => {
		copyClipboard(textarea.value);
	};

	const onClickReset = () => {
		copyClipboard("");
	};
</script>

<!-- html -->
<div>
	<p>
		<span class="font-bold">clipboard content:</span> <code>{$clipboard || "empty"}</code>
	</p>

	<div class="flex items-center space-x-4 flex-col">
		<textarea
			bind:this={textarea}
			value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
			class="rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:focus:ring-offset-2 dark:focus:ring-offset-gray-900 w-full h-48"
		/>
		<div>
			<button on:click={onClickTextarea}>copy to clipboard</button>
			<button on:click={onClickReset}>reset</button>
		</div>
	</div>
</div>
`;
