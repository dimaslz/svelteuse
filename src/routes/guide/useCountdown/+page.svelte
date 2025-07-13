<script lang="ts">
	import { Browser, Button, DocTpl, H2, Highlight, Link } from "@/components";

	import { exampleCode, sourceCode } from "./code-snippet";

	import { useCountdown } from '@/hooks';

	// example
  const [count, { start, stop, reset }] = useCountdown({
    countStart: 10,
    countStop: 5,
    intervalMs: 1000,
    isIncrement: false
  });
</script>

<DocTpl title="useCountdown">
	<div slot="description" class="space-y-2">
		<p>
			Custom hook that manages countdown.
		</p>

		<h3 class="text-lg">Related hooks</h3>
		<ul class="list-disc pl-6">
			<li><Link href="/guide/useCounter">useCounter</Link></li>
			<li><Link href="/guide/useBoolean">useBoolean</Link></li>
			<li><Link href="/guide/useIntervalFn">useIntervalFn</Link></li>
		</ul>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks-ts.com/react-hook/use-countdown"
					>https://usehooks-ts.com/react-hook/use-countdown</Link
				>
			</li>
			<li>
				<Link href="https://usehooks.com/usecountdown"
					>https://usehooks.com/usecountdown</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div class="w-full">
				<h1>{$count}</h1>
				<Button on:click={start}>Start</Button>
				<Button on:click={stop}>Stop</Button>
				<Button on:click={reset}>Reset</Button>
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
