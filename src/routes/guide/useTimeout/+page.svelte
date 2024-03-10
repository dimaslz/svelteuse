<script lang="ts">
	import { Browser, Button, DocTpl, H2, Highlight, Link } from "@/components";
	import { useTimeout } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	const { start, stop, ready } = useTimeout(2000, { controls: true });
</script>

<DocTpl title="useTimeout">
	<div slot="description">
		<p>Simple hook to execute a function after a time defined.</p>

		<h3 class="text-lg">Related hooks:</h3>
		<ul class="list-disc pl-6">
			<li><Link href="/guide/useState">useState</Link></li>
			<li><Link href="/guide/useTimeoutFn">useTimeoutFn</Link></li>
		</ul>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://vueuse.org/shared/useTimeout/" target="_blank"
					>https://vueuse.org/shared/useTimeout/</Link
				>
			</li>
			<li>
				<Link href="https://usehooks.com/usetimeout" target="_blank"
					>https://usehooks.com/usetimeout</Link
				>
			</li>
			<li>
				<Link href="https://usehooks-ts.com/react-hook/use-timeout" target="_blank"
					>https://usehooks-ts.com/react-hook/use-timeout</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<p>
				{$ready ? "Ready!" : "Please wait 2 seconds"}
			</p>
			<div>
				{#if $ready}
					<Button on:click={start}>start again</Button>
				{:else}
					<Button on:click={stop}>stop</Button>
				{/if}
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
