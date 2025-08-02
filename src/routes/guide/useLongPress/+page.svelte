<script lang="ts">
	import { writable } from "svelte/store";

	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";
	import { exampleCode, sourceCode } from "./code-snippet";
	import { useLongPress } from "@/hooks";

	// example
	const longPressDone = writable<boolean>(false);

	function handleLongPress(event: Event) {
		console.log("Long press fired", event);
		longPressDone.update(() => true);
	}
</script>

<DocTpl title="useLongPress">
	<div slot="description">
		<p>
			Enable precise control of long-press interactions for both touch and mouse events with
			useLongPress.
		</p>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks.com/uselongpress" target="_blank"
					>https://usehooks.com/uselongpress</Link
				>
			</li>
			<li>
				<Link href="https://vueuse.org/core/onLongPress" target="_blank"
					>https://vueuse.org/core/onLongPress</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				<div
					use:useLongPress={handleLongPress}
					style="padding: 2rem; border: 1px solid;"
					class={$longPressDone ? "bg-green-900" : ""}
				>
					Press and hold me
				</div>
				<p>Is pressed done: {$longPressDone ? "yes" : "no"}</p>
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
