<script lang="ts">
	import { Button, DocTpl, H2, Highlight, Link } from "@/components";
	import Browser from "@/components/browser/Browser.svelte";
	import { useIntervalFn, useState } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	const [counter, updateCounter] = useState<number>(0);
	const { isActive, resume, pause } = useIntervalFn(() => {
		updateCounter((v) => v + 1);
	}, 200);
</script>

<DocTpl title="useIntervalFn">
	<div slot="description">
		<p>Use interval event from a hook, triggering a callback.</p>

		<h3 class="text-lg">Related hooks</h3>
		<ul class="list-disc pl-6">
			<li><Link href="/guide/useState">useState</Link></li>
			<li><Link href="/guide/useIntervalFn">useIntervalFn</Link></li>
		</ul>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://vueuse.org/shared/useIntervalFn/"
					>https://vueuse.org/shared/useIntervalFn/</Link
				>
			</li>
			<li>
				<Link href="https://usehooks.com/useintervalwhen">https://usehooks.com/useintervalwhen</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<p>
				Update number every 200ms is <code>{$counter}</code>
			</p>
			<p>
				is active: {$isActive}
			</p>

			<div>
				<Button on:click={pause}>pause</Button>
				<Button on:click={resume}>resume</Button>
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
