<script lang="ts">
	import { Browser, Button, DocTpl, H2, Highlight, Link } from "@/components";
	import { useClipboard } from "@/hooks";

	import { codeBase, exampleCode } from "./code-snippet";

	const [clipboard, copyClipboard] = useClipboard();

	let textarea: HTMLTextAreaElement;
	const onClickTextarea = () => {
		copyClipboard(textarea.value);
	};

	const onClickReset = () => {
		copyClipboard("");
	};
</script>

<DocTpl title="useClipboard">
	<div slot="description">
		<p>Hook to work copy to clipboard easily.</p>

		<h3 class="text-lg">Related hooks</h3>
		<ul class="list-disc pl-6">
			<li><Link href="/guide/useEventListener">useEventListener</Link></li>
		</ul>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks.com/usecopytoclipboard" target="_blank"
					>https://usehooks.com/usecopytoclipboard</Link
				>
			</li>
			<li>
				<Link href="https://usehooks-ts.com/react-hook/use-copy-to-clipboard" target="_blank"
					>https://usehooks-ts.com/react-hook/use-copy-to-clipboard</Link
				>
			</li>
			<li>
				<Link href="https://vueuse.org/core/useClipboard" target="_blank"
					>https://vueuse.org/core/useClipboard</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div class=" space-y-6">
				<p>
					<span class="font-bold">clipboard content:</span> <code>{$clipboard || "empty"}</code>
				</p>

				<div class="flex items-center space-x-4 flex-col">
					<textarea
						bind:this={textarea}
						value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
						class="rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:focus:ring-offset-2 dark:focus:ring-offset-gray-900 w-full h-48"
					/>
					<div class="mt-4">
						<Button on:click={onClickTextarea}>copy to clipboard</Button>
						<Button on:click={onClickReset}>reset</Button>
					</div>
				</div>
			</div>
		</Browser>
	</div>

	<div slot="code-example">
		<H2>Code base</H2>
		<Highlight language="svelte" code={codeBase} />

		<div class="h-12"></div>
		<H2>Code example</H2>
		<Highlight code={exampleCode} />
	</div>
</DocTpl>
