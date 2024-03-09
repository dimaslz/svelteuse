<script lang="ts">
	import { onMount } from "svelte";

	import { Browser, Button, DocTpl, H2, Highlight } from "@/components";
	import { useState, useTimeoutFn } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	const [value, update] = useState<string>("Please wait 3 seconds");
	const { start, stop, isPending } = useTimeoutFn(() => {
		update("Fired!");
	}, 3000);

	const startTimeout = () => {
		update("Please wait 3 seconds");
		start();
	};

	onMount(() => {
		return () => {
			stop();
		};
	});
</script>

<DocTpl title="useTimeoutFn">
	<div slot="description">
		<p>Simple hook to execute a function after a time defined.</p>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<p>
				{$value}
			</p>

			<div>
				{#if $isPending}
					<Button on:click={stop}>stop</Button>
				{:else}
					<Button on:click={startTimeout}>start</Button>
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
