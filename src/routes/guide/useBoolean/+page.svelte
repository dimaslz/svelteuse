<script lang="ts">
	import { get } from "svelte/store";

	import { Browser, Button, DocTpl, H2, Highlight, Link } from "@/components";
	import { useBoolean } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	const { value, setValue, setTrue, setFalse, toggle } = useBoolean();

	const customToggle = () => {
		setValue(!get(value));
	};
</script>

<DocTpl title="useBoolean">
	<div slot="description">
		<p>A simple hook to play with boolean values.</p>

		<h3 class="text-lg">Related hooks</h3>
		<ul class="list-disc pl-6">
			<li><Link href="/guide/useTooggle">useTooggle</Link></li>
		</ul>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks-ts.com/react-hook/use-boolean"
					>https://usehooks-ts.com/react-hook/use-boolean</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				<p>
					Value <code>{$value}</code>
				</p>

				<div>
					<Button on:click={setTrue}>set true</Button>
					<Button on:click={setFalse}>set false</Button>
					<Button on:click={toggle}>toggle value</Button>
					<Button on:click={customToggle}>custom toggle</Button>
				</div>
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
