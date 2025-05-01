<script lang="ts">
	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";
	import { useLocation } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";
	import InputText from "@/components/input-text/InputText.svelte";

	const location = useLocation();

	const onInput = (event: Event) => {
		const value = (event.target as HTMLInputElement).value;

		$location.hash = value;
		history.pushState($location.href, "", `#${value}`);
		window.dispatchEvent(new HashChangeEvent("hashchange"))
	};
</script>

<DocTpl title="useLocation">
	<div slot="description">
		<p>Listen the size of the window.</p>

		<h3 class="text-lg">Related hooks:</h3>
		<ul class="list-disc pl-6">
			<li><Link href="/guide/useEventListener">useEventListener</Link></li>
		</ul>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://vueuse.org/core/useBrowserLocation" target="_blank"
					>https://vueuse.org/core/useBrowserLocation</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div class="text-xs">
				<InputText
					value={$location.hash?.replace("#", "")} on:input={onInput}
					placeholder="write some #hash value..."
				/>

				<pre class="py-4">{JSON.stringify($location, null, 2)}</pre>
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
