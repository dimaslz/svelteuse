<script lang="ts">
  import { writable } from 'svelte/store';
	import { Browser, Button, DocTpl, H2, Highlight, Link } from "@/components";

	import { exampleCode, sourceCode } from "./code-snippet";
	import { usePrevious } from "@/hooks";

	// example
  const count = writable(0);
  const prevCount = usePrevious(count);

  function increment() {
    count.update(n => n + 1);
  }
</script>

<DocTpl title="usePrevious">
	<div slot="description">
		<p>Track the previous value of a variable with usePrevious.</p>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks.com/useprevious" target="_blank"
					>https://usehooks.com/useprevious</Link
				>
			</li>
			<li>
				<Link href="https://vueuse.org/core/usePrevious" target="_blank"
					>https://vueuse.org/core/usePrevious</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				<Button on:click={increment}>Increment</Button>
				<p>Current: {$count}</p>
				<p>Previous: {$prevCount}</p>
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
