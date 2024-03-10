<script lang="ts">
	import { Browser, Button, DocTpl, H2, Highlight } from "@/components";
	import { useTimeout } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	const { start, stop, ready } = useTimeout(2000, { controls: true });
</script>

<DocTpl title="useTimeoutFn">
	<div slot="description">
		<p>Simple hook to execute a function after a time defined.</p>
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
