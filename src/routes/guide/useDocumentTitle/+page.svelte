<script lang="ts">
	import { Browser, DocTpl, Highlight, Link } from "@/components";
	import H2 from "@/components/h/h2.svelte";
	import { useDocumentTitle } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	const [title, updateTitle] = useDocumentTitle("site title");

	const onInput = ($event: Event) => {
		updateTitle(($event.target as HTMLInputElement).value);
	};
</script>

<DocTpl title="useDocumentTitle">
	<div slot="description" class="space-y-2">
		<p>Allow to update the site title easily.</p>

		<h3 class="text-lg">Related hooks</h3>
		<ul class="list-disc pl-6">
			<li><Link href="/guide/useState">useState</Link></li>
		</ul>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks-ts.com/react-hook/use-document-title"
					>https://usehooks-ts.com/react-hook/use-document-title</Link
				>
			</li>
			<li>
				<Link href="https://vueuse.org/core/useTitle">https://vueuse.org/core/useTitle</Link>
			</li>
			<li>
				<Link href="https://usehooks.com/usedocumenttitle"
					>https://usehooks.com/usedocumenttitle</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser title={$title} body="p-4 bg-gray-950/50">
			<p class="py-2">
				Document title is: <code>{$title}</code>
			</p>
			<input
				value={$title}
				on:input={onInput}
				class="rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:focus:ring-offset-2 dark:focus:ring-offset-gray-900 w-full"
			/>
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
