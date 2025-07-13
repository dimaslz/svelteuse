<script lang="ts">
	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";

	import { exampleCode, sourceCode } from "./code-snippet";
	import { useContinuousRetry } from "@/hooks";

	// example
  let attemptCount = 0;

  const hasResolved = useContinuousRetry(() => {
    attemptCount += 1;
    return attemptCount >= 5; // will resolve on 5th attempt
  }, 200);
</script>

<DocTpl title="useContinuousRetry">
	<div slot="description">
		<p>Automates retries of a callback function until it succeeds with useContinuousRetry.</p>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks.com/usecontinuousretry" target="_blank"
					>https://usehooks.com/usecontinuousretry</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				<p>Resolved? {$hasResolved ? 'Yes' : 'No'}</p>
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
