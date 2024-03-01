<script lang="ts">
	import { Browser, Button, DocTpl, H2, Highlight, Link } from "@/components";
	import { useCounter } from "@/hooks";

	import code from "./code-snippet";

	const { count, increment, decrement, reset, setCount } = useCounter(99);

	const multiplyBy2 = () => setCount((x: number) => x * 2);
</script>

<DocTpl title="useCounter">
	<div slot="description">
		<div class="space-y-2">
			<p>A simple hook to implement a counter by actions.</p>

			<h3>Related hooks</h3>

			<ul class="list-disc pl-6">
				<li><Link href="/guide/useState">useState</Link></li>
			</ul>
		</div>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				<p>
					Value <code>{$count}</code>
				</p>

				<div>
					<Button on:click={() => increment()}>increment</Button>
					<Button on:click={() => decrement()}>decrement</Button>
					<Button on:click={reset}>reset</Button>
					<Button on:click={multiplyBy2}>multiply by 2</Button>
				</div>
			</div>
		</Browser>
	</div>

	<div slot="code-example">
		<H2>Code example</H2>

		<Highlight {code} />
	</div>
</DocTpl>
