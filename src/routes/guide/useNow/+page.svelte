<script lang="ts">
	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";

	import { exampleCode, sourceCode } from "./code-snippet";
	import { useNow } from "@/hooks";

	// example
	const now = useNow();
</script>

<DocTpl title="useNow">
	<div slot="description">
		<p>Reactive dark theme preference.</p>

		<h3 class="text-lg">Related hooks</h3>
		<ul class="list-disc pl-6">
			<li><Link href="/guide/useIntervalFn">useIntervalFn</Link></li>
		</ul>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://vueuse.org/core/useNow" target="_blank"
					>https://vueuse.org/core/useNow</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				<pre>{$now}</pre>
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
