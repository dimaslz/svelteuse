<script lang="ts">
	import { onMount } from "svelte";

	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";
	import { exampleCode, sourceCode } from "./code-snippet";
	import { useRandomInterval } from "@/hooks";

	// example
	let count = 0;

	onMount(() => {
		const clear = useRandomInterval(
			() => {
				count += 1;
			},
			{ minDelay: 300, maxDelay: 1000 },
		);

		// Optional: cancel after some time
		setTimeout(() => {
			clear();
		}, 5000);
	});
</script>

<DocTpl title="useRandomInterval">
	<div slot="description">
		<p>Reactive dark theme preference.</p>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks.com/userandominterval" target="_blank"
					>https://usehooks.com/userandominterval</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				<pre>{count}</pre>
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
