<script lang="ts">
	import { Browser, Button, DocTpl, H2, Highlight, Link } from "@/components";
	import { useIdle } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	// example
	const idle = useIdle(5000);

	let isTracking = true;
	idle.isTracking.subscribe((v) => isTracking = v)
</script>

<DocTpl title="useIdle">
	<div slot="description">
		<div class="space-y-2">
			<p>Detect user inactivity with useIdle.</p>

			<h3 class="text-lg">Inspired on:</h3>
			<ul class="list-disc pl-6">
				<li>
					<Link href="https://usehooks.com/useidle">
					  https://usehooks.com/useidle
					</Link>
				</li>
				<li>
					<Link href="https://vueuse.org/core/useIdle">
			  https://vueuse.org/core/useIdle
					</Link>
				</li>
			</ul>
		</div>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
  		<p>isTracking: {isTracking}</p>
  		<p>User is { $idle ? 'idle 😴' : 'active 👍' }</p>

      <Button on:click={idle.start}>Start tracking</Button>
      <Button on:click={idle.stop}>Stop tracking</Button>
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
