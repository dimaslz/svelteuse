<script lang="ts">
	import { onMount } from "svelte";

	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";
	import { useClickOutside } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	const onClickHandler = () => {
		console.log("onClickHandler");
	};
	let element: HTMLElement;

	const { removeListener, setElementRef } = useClickOutside({ handler: onClickHandler });

	onMount(() => {
		setElementRef(element);

		return () => {
			removeListener();
		};
	});
</script>

<DocTpl title="useClickOutside">
	<div slot="description">
		<p>Hook to catch the click on any part of the site</p>

		<h3 class="text-lg">Related hooks</h3>
		<ul class="list-disc pl-6">
			<li><Link href="/guide/useEventListener">useEventListener</Link></li>
		</ul>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks.com/useclickaway" target="_blank"
					>https://usehooks.com/useclickaway</Link
				>
			</li>
			<li>
				<Link href="https://usehooks-ts.com/react-hook/use-on-click-outside" target="_blank"
					>https://usehooks-ts.com/react-hook/use-on-click-outside</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div class="h-24 w-24 bg-gray-600 p-2" bind:this={element}>click outside here</div>
		</Browser>
	</div>

	<div slot="code-example">
		<H2>Code base</H2>
		<Highlight language="typescript" code={sourceCode} />

		<div class="h-12"></div>
		<H2>Code example</H2>
		<Highlight code={exampleCode} />
	</div>
</DocTpl>
