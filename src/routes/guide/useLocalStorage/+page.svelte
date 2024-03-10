<script lang="ts">
	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";
	import { Button } from "@/components";
	import { useLocalStorage } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	const { store, update, reset, clear } = useLocalStorage<boolean>("dimaslz-svelteuse", true);

	const toggleTheme = () => {
		update((prevValue) => {
			return !prevValue;
		});
	};
</script>

<DocTpl title="useLocalStorage">
	<div slot="description">
		<p>Use interval event from a hook, triggering a callback.</p>

		<h3 class="text-lg">Related hooks</h3>
		<ul class="list-disc pl-6">
			<li><Link href="/guide/useState">useState</Link></li>
			<li><Link href="/guide/useEventListener">useEventListener</Link></li>
		</ul>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks.com/uselocalstorage">https://usehooks.com/uselocalstorage</Link
				>
			</li>
			<li>
				<Link href="https://vueuse.org/core/useLocalStorage/"
					>https://vueuse.org/core/useLocalStorage/</Link
				>
			</li>
			<li>
				<Link href="https://usehooks-ts.com/react-hook/use-local-storage"
					>https://usehooks-ts.com/react-hook/use-local-storage</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<p>
				Value is <code>{JSON.stringify($store)}</code>
			</p>
			<Button on:click={toggleTheme}>update state</Button>
			<Button on:click={reset}>reset state</Button>
			<Button on:click={clear}>clear state</Button>
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
