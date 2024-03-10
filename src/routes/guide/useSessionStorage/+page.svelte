<script lang="ts">
	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";
	import { Button } from "@/components";
	import { useSessionStorage } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	const { store, update, reset, clear } = useSessionStorage<boolean>("dimaslz-svelteuse", true);

	const toggleTheme = () => {
		update((prevValue) => {
			return !prevValue;
		});
	};
</script>

<DocTpl title="useSessionStorage">
	<div slot="description">
		<p>Manage a session storage easily by a hook.</p>

		<h3 class="text-lg">Related hooks:</h3>
		<ul class="list-disc pl-6">
			<li><Link href="/guide/useState">useState</Link></li>
			<li><Link href="/guide/useEventListener">useEventListener</Link></li>
		</ul>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks.com/usesessionstorage" target="_blank"
					>https://usehooks.com/usesessionstorage</Link
				>
			</li>
			<li>
				<Link href="https://usehooks-ts.com/react-hook/use-session-storage" target="_blank"
					>https://usehooks-ts.com/react-hook/use-session-storage</Link
				>
			</li>
			<li>
				<Link href="https://vueuse.org/core/useSessionStorage/" target="_blank"
					>https://vueuse.org/core/useSessionStorage/</Link
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
