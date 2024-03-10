<script lang="ts">
	import { get } from "svelte/store";

	import { Browser, Button, DocTpl, H2, Highlight, Link } from "@/components";
	import { useToggle } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	const { value, toggle, update } = useToggle();

	const customToggle = () => {
		update(!get(value));
	};
</script>

<DocTpl title="useToggle">
	<div slot="description">
		<p>Simple hook to work with a toggle action.</p>

		<h3 class="text-lg">Related hooks:</h3>
		<ul class="list-disc pl-6">
			<li><Link href="/guide/useState">useState</Link></li>
		</ul>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks-ts.com/react-hook/use-toggle" target="_blank"
					>https://usehooks-ts.com/react-hook/use-toggle</Link
				>
			</li>
			<li>
				<Link href="https://usehooks.com/usetoggle" target="_blank"
					>https://usehooks.com/usetoggle</Link
				>
			</li>
			<li>
				<Link href="https://vueuse.org/shared/useToggle/" target="_blank"
					>https://vueuse.org/shared/useToggle/</Link
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
			</div>

			<div>
				<Button on:click={toggle}>toggle value</Button>
				<Button on:click={customToggle}>custom toggle</Button>
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
