<script lang="ts">
	import { Browser, Button, DocTpl, H2, Highlight, Link } from "@/components";
	import { useObjectState } from "@/hooks/useObjectState/useObjectState";

	import { exampleCode, sourceCode } from "./code-snippet";

	// example
	const initial = {
    team: 'Utah Jazz',
    wins: 2138,
    losses: 1789,
    championships: 0
  };
	const { subscribe, setState } = useObjectState(initial);

  let stats: typeof initial;
  subscribe(value => (stats = value));

  const addWin = () => setState(s => ({ wins: s.wins + 1 }));
  const addLoss = () => setState({ losses: stats.losses + 1 });
  const reset = () => setState(initial);
</script>

<DocTpl title="useObjectState">
	<div slot="description">
		<div class="space-y-2">
			<p>Manage complex state objects with useObjectState.</p>

			<h3 class="text-lg">Inspired on:</h3>
			<ul class="list-disc pl-6">
				<li>
					<Link href="https://usehooks.com/useobjectstate">https://usehooks.com/useobjectstate</Link>
				</li>
			</ul>
		</div>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
  		<Button on:click={addWin}>Add Win</Button>
      <Button on:click={addLoss}>Add Loss</Button>
      <Button on:click={reset}>Reset</Button>

      <pre>{JSON.stringify(stats, null, 2)}</pre>
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
