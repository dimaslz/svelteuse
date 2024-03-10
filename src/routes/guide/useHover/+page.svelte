<script lang="ts">
	import { onMount } from "svelte";

	import { DocTpl, H2, Highlight, Link } from "@/components";
	import Browser from "@/components/browser/Browser.svelte";
	import { useHover } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	let hoverRef: HTMLElement;
	const [isHover, setElement] = useHover();

	onMount(() => {
		setElement(hoverRef);
	});
</script>

<DocTpl title="useHover">
	<div slot="description">
		<p>Listen the hover event of a element.</p>

		<h3 class="text-lg">Related hooks</h3>
		<ul class="list-disc pl-6">
			<li><Link href="/guide/useState">useState</Link></li>
			<li><Link href="/guide/useEventListener">useEventListener</Link></li>
		</ul>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks-ts.com/react-hook/use-hover"
					>https://usehooks-ts.com/react-hook/use-hover</Link
				>
			</li>
			<li>
				<Link href="https://usehooks.com/usehover">https://usehooks.com/usehover</Link>
			</li>
			<li>
				<Link href="https://vueuse.org/core/useElementHover/"
					>https://vueuse.org/core/useElementHover/</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div class="space-y-2">
				<p>
					isHover? <code>{$isHover}</code>
				</p>

				<div
					class={[
						"w-full h-24 flex items-center justify-center",
						$isHover ? "bg-gray-900" : "bg-gray-800",
					].join(" ")}
					bind:this={hoverRef}
				>
					<div class="text-gray-600">hover your mouse here</div>
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
