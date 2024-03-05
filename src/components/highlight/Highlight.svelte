<script lang="ts">
	import Highlight, { HighlightSvelte } from "svelte-highlight";
	import typescript from "svelte-highlight/languages/typescript";
	import codeStyle from "svelte-highlight/styles/github-dark";

	import { ClipboardOutlineIcon } from "@/components/icons";
	import { useClipboard, useDebounceFn } from "@/hooks";

	export let code: string = "";
	export let language: string = "svelte";
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
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html codeStyle}
</svelte:head>

<div>
	<div class="bg-gray-950 relative text-xs">
		{#if showConfirmation}
			<div class="absolute left-2 top-2 bg-green-900 text-xs p-2">code copied!</div>
		{/if}

		<button
			on:click={onCopyCode}
			class="absolute top-2 right-2 bg-gray-800 rounded-md p-2 [&>svg]:hover:text-gray-400"
		>
			<ClipboardOutlineIcon class="w-4 h-4 text-gray-600" />
		</button>

		{#if language === "typescript"}
			<Highlight language={typescript} code={code.trim()} />
		{:else}
			<HighlightSvelte code={code.trim()} />
		{/if}
	</div>
</div>
