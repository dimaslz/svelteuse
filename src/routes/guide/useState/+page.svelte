<script lang="ts">
	import { DocTpl, H2, Highlight } from "@/components";
	import { Button } from "@/components";
	import Browser from "@/components/browser/Browser.svelte";
	import { useState } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	const [state, setState] = useState<number>(0);

	const updateState = () => {
		const newValue = $state + 1;
		setState(newValue);
	};
	const updateStateByFn = () => {
		setState((prev) => prev + 1);
	};
</script>

<DocTpl title="useState">
	<div slot="description">
		<p>
			This hook works like the React hook. The difference using the hook and without using the hook
			is small, for that feel free to do not use.
		</p>
	</div>

	<div slot="visual-example">
		<H2>Visual Example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				<p>
					Value is <code>{$state}</code>
				</p>
				<Button on:click={updateState}>update state</Button>
				<Button on:click={updateStateByFn}>update by function</Button>
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
