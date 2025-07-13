<script lang="ts">
	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";

	import { exampleCode, sourceCode } from "./code-snippet";
	import { useMouseInElement } from "@/hooks";

	// example
	const [mouse, mouseTracker] = useMouseInElement();
</script>

<DocTpl title="useMouseInElement">
	<div slot="description">
		<p>Track and retrieve the position of the mouse cursor with useMouseInElement.</p>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://vueuse.org/core/useMouseInElement" target="_blank"
					>https://vueuse.org/core/useMouseInElement</Link
				>
			</li>
			<li>
				<Link href="https://usehooks.com/usemouse" target="_blank"
					>https://usehooks.com/usemouse</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50 h-[400px] overflow-scroll">
			<div>
				<div
					use:mouseTracker
					class={[
						"size-56 border p-4 text-black",
						$mouse.isOutside ? "bg-red-200" : 'bg-green-200'
					].join(" ")}
				>
					<p>Mouse X: {$mouse.x}</p>
					<p>Mouse Y: {$mouse.y}</p>
					<p>Element X: {$mouse.elementX}</p>
					<p>Element Y: {$mouse.elementY}</p>
					<p>Element Width: {$mouse.elementWidth}</p>
					<p>Element Height: {$mouse.elementHeight}</p>
					<p>isOutside: {$mouse.isOutside}</p>
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
