<script lang="ts">
	import { onMount } from "svelte";

	import { Browser, Button, DocTpl, H2, Highlight } from "@/components";
	import Link from "@/components/link/Link.svelte";
	import { useEventListener } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	let ref: HTMLButtonElement;

	let clickOnWindow: boolean = false;
	let clickOnButton: boolean = false;

	const onClickWindowHandler = () => {
		console.log("on click window");

		clickOnWindow = true;
		clickOnButton = false;
	};
	const onClickWindow = useEventListener("click", onClickWindowHandler);

	const onClickButtonHandler = () => {
		console.log("on click button");

		clickOnButton = true;
	};

	onMount(() => {
		const clickButtonHandler = useEventListener("click", onClickButtonHandler, ref);

		return () => {
			clickButtonHandler?.();
			onClickWindow?.();
		};
	});
</script>

<DocTpl title="useEventListener">
	<div slot="description">
		<p>Listen any event from a element.</p>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://vueuse.org/core/useEventListener/"
					>https://vueuse.org/core/useEventListener/</Link
				>
			</li>
			<li>
				<Link href="https://usehooks.com/useeventlistener"
					>https://usehooks.com/useeventlistener</Link
				>
			</li>
			<li>
				<Link href="https://usehooks-ts.com/react-hook/use-event-listener"
					>https://usehooks-ts.com/react-hook/use-event-listener</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser>
			<div class="space-y-4">
				<div class="p-4 bg-gray-950/50">
					<p>
						<span class="font-bold">click on window:</span> <code>{clickOnWindow}</code>
					</p>
					<p>
						<span class="font-bold">click on button:</span> <code>{clickOnButton}</code>
					</p>

					<div>
						<Button bind:ref>click here</Button>
					</div>
				</div>
			</div>
		</Browser>
	</div>

	<div slot="code-example">
		<div>
			<H2>Code base</H2>

			<Highlight language="typescript" code={sourceCode} />
		</div>

		<div class="mt-12">
			<H2>Code example</H2>

			<Highlight code={exampleCode} />
		</div>
	</div>
</DocTpl>
