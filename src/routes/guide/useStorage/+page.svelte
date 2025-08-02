<script lang="ts">
	import { Browser, Button, DocTpl, H2, Highlight, Link } from "@/components";

	import { useStorage } from "@/hooks";
	import { exampleCode, sourceCode } from "./code-snippet";

	// example
	const count = useStorage<number>("my-count", 0);
	const settings = useStorage<{ theme: string }>(
		"settings",
		{ theme: "light" },
		typeof window !== "undefined" ? localStorage : undefined,
		{ mergeDefaults: true },
	);

	function inc() {
		count.update((n) => n + 1);
	}
</script>

<DocTpl title="useStorage">
	<div slot="description">
		<div class="space-y-2">
			<p>
				It helps avoid repetitive JSON.parse / localStorage.setItem boilerplate and ensures Svelte’s
				reactivity integrates cleanly with browser storage — even in SSR environments.
			</p>

			<h3 class="text-lg">Inspired on:</h3>
			<ul class="list-disc pl-6">
				<li>
					<Link href="https://vueuse.org/core/useStorage">https://vueuse.org/core/useStorage</Link>
				</li>
			</ul>
		</div>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<Button on:click={inc}>Increment: {$count}</Button>
			<select bind:value={$settings.theme}>
				<option>light</option>
				<option>dark</option>
			</select>
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
