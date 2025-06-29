<script lang="ts">
	import { DocTpl, H2, Highlight } from "@/components";
	import Browser from "@/components/browser/Browser.svelte";

	import { exampleCode, sourceCode } from "./code-snippet";
	import Button from "@/components/button/Button.svelte";
	import { useStepper } from "@/hooks/useStepper/useStepper";
	import Link from "@/components/link/Link.svelte";

	const steps = ['Account', 'Details', 'Confirm'];
	const {
		current,
		goToNext,
		goToPrevious,
		isFirst,
		isLast,
	} = useStepper(steps);

</script>

<DocTpl title="useStepper">
	<div slot="description">
		<p>
			Offers utilities to control and navigate multi-step workflows.
		</p>
	</div>

	<h3 class="text-lg">Inspired on:</h3>
	<ul class="list-disc pl-6">
		<li>
			<Link href="https://vueuse.org/core/useStepper" target="_blank"
				>https://vueuse.org/core/useStepper</Link
			>
		</li>
	</ul>

	<div slot="visual-example">
		<H2>Visual Example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<h2>Step: {$current}</h2>

			{#if $current === 'Account'}
				<p>Account setup step</p>
			{:else if $current === 'Details'}
				<p>Enter personal details</p>
			{:else}
				<p>Confirm and submit</p>
			{/if}

			<div style="margin-top: 1rem;">
				<Button on:click={goToPrevious} disabled={$isFirst}>Back</Button>
				<Button on:click={goToNext} disabled={$isLast}>Next</Button>
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
