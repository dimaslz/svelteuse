<script lang="ts">
	import "./theme.css";
	import "./prism-highlight-code";

	import Prism from "prismjs";

	import { ClipboardOutlineIcon } from "@/components/icons";
	import { useClipboard, useDebounceFn } from "@/hooks";

	export let code: string = "";
	let showConfirmation: boolean = false;

	const [, copyClipboard] = useClipboard();

	const hideConfirmation = () => {
		showConfirmation = false;
	};

	const hideConfirmationDebounced = useDebounceFn(hideConfirmation, 1000);

	const onCopyCode = () => {
		copyClipboard(code);
		showConfirmation = true;
		hideConfirmationDebounced();
	};

	let html: string = "";
	html = Prism.highlight(code, Prism.languages.svelte, "svelte");
</script>

<div>
	<div class="p-4 bg-gray-950 relative">
		{#if showConfirmation}
			<div class="absolute left-2 top-2 bg-green-900 text-xs p-2">code copied!</div>
		{/if}

		<button
			on:click={onCopyCode}
			class="absolute top-2 right-2 bg-gray-800 rounded-md p-2 [&>svg]:hover:text-gray-400"
		>
			<ClipboardOutlineIcon class="w-6 h-6 text-gray-600" />
		</button>

		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<pre class="text-xs overflow-x-scroll"><code>{@html `${html.trim()}\n\n`}</code></pre>
	</div>
</div>
