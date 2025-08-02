<script lang="ts">
	import { Button, Link, Browser, DocTpl, H2, Highlight } from "@/components";

	import { exampleCode, sourceCode } from "./code-snippet";
	import { useStep } from "@/hooks";

	// example
	const [step, { goToNextStep, goToPrevStep, canGoToNextStep, canGoToPrevStep }] = useStep(5);
</script>

<DocTpl title="useStep">
	<div slot="description">
		<p>A Svelte hook for controlling and navigating step-based workflows or wizards.</p>
	</div>

	<h3 class="text-lg">Inspired on:</h3>
	<ul class="list-disc pl-6">
		<li>
			<Link href="https://usehooks-ts.com/react-hook/use-step" target="_blank"
				>https://usehooks-ts.com/react-hook/use-step</Link
			>
		</li>
	</ul>

	<div slot="visual-example">
		<H2>Visual Example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<h2>Step {$step} of 5</h2>

			{#if $step > 0 && $step < 5}
				<p>Step {$step} content</p>
			{:else if $step === 5}
				<p>Final Step</p>
			{/if}

			<div style="margin-top: 1rem;">
				<Button on:click={goToPrevStep} disabled={!$canGoToPrevStep}>Previous</Button>
				<Button on:click={goToNextStep} disabled={!canGoToNextStep}>Next</Button>
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
