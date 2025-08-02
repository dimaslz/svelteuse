<script lang="ts">
	import { Browser, Button, DocTpl, H2, Highlight, Link } from "@/components";

	import { exampleCode, sourceCode } from "./code-snippet";
	import { useEventCallback } from "@/hooks";

	// example
	const handleClick = useEventCallback((event) => {
		console.log("Clicked", event);
	});
</script>

<DocTpl title="useEventCallback">
	<div slot="description">
		<p>Hook to memoize callback events.</p>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks-ts.com/react-hook/use-event-callback" target="_blank"
					>https://usehooks-ts.com/react-hook/use-event-callback</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				<Button on:click={handleClick}>click here!</Button>
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
