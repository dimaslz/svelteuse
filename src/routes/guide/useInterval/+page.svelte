<script lang="ts">
	import { Button, DocTpl, H2, Highlight, Link } from "@/components";
	import Browser from "@/components/browser/Browser.svelte";
	import { useInterval } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	const counter = useInterval(200);
	const { isActive, state: counter2, reset, pause, resume } = useInterval(200, { controls: true });
</script>

<DocTpl title="useInterval">
	<div slot="description">
		<p>Use interval event from a hook.</p>

		<h3 class="text-lg">Related hooks</h3>
		<ul class="list-disc pl-6">
			<li><Link href="/guide/useState">useState</Link></li>
			<li><Link href="/guide/useIntervalFn">useIntervalFn</Link></li>
		</ul>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks-ts.com/react-hook/use-interval"
					>https://usehooks-ts.com/react-hook/use-interval</Link
				>
			</li>
			<li>
				<Link href="https://usehooks.com/useinterval">https://usehooks.com/useinterval</Link>
			</li>
			<li>
				<Link href="https://vueuse.org/shared/useInterval"
					>https://vueuse.org/shared/useInterval</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<p>
				Update number every 200ms without controls: <code>{$counter}</code>
			</p>

			<div>
				<p>
					Update number every 200ms with controls: <code>{$counter2}</code>
				</p>

				<p>
					is active: {$isActive}
				</p>

				<div>
					<Button on:click={pause}>pause</Button>
					<Button on:click={resume}>resume</Button>
					<Button on:click={reset}>reset</Button>
				</div>
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
