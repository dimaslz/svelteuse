<script lang="ts">
	import { onMount } from "svelte";

	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";
	import { useClickOutside } from "@/hooks";

	import code from "./code-snippet";

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

		<h3>Related hooks</h3>

		<ul class="list-disc pl-6">
			<li><Link href="/guide/useEventListener">useEventListener</Link></li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div class="h-24 w-24 bg-gray-600 p-2" bind:this={element}>click outside here</div>
		</Browser>
	</div>

	<div slot="code-example">
		<H2>Code example</H2>

		<Highlight {code} />
	</div>
</DocTpl>
