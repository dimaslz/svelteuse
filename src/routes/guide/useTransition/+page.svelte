<script lang="ts">
	import { writable } from "svelte/store";

	import { Browser, Button, DocTpl, H2, Highlight, Link } from "@/components";
	import { exampleCode, sourceCode } from "./code-snippet";
	import { useTransition } from "@/hooks";

	// example
	const value = writable(0);
	const animated = useTransition(value, {
		duration: 800,
		easing: [0.42, 0, 0.58, 1], // ease-in-out
		onStarted: () => console.log("Started"),
		onFinished: () => console.log("Finished"),
	});

	function increment() {
		value.update((v) => v + 100);
	}
</script>

<DocTpl title="useTransition">
	<div slot="description">
		<p>Transition between values.</p>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://vueuse.org/core/useTransition" target="_blank"
					>https://vueuse.org/core/useTransition</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				<Button on:click={increment}>Animate</Button>
				<p>Animated Value: {$animated.toFixed(2)}</p>
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
