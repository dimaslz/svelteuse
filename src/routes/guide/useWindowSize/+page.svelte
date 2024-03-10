<script lang="ts">
	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";
	import { useWindowSize } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	const { windowSize } = useWindowSize();
</script>

<DocTpl title="useWindowSize">
	<div slot="description">
		<p>Listen the size of the window.</p>

		<h3 class="text-lg">Related hooks:</h3>
		<ul class="list-disc pl-6">
			<li><Link href="/guide/useState">useState</Link></li>
			<li><Link href="/guide/useEventListener">useEventListener</Link></li>
		</ul>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks.com/usewindowsize" target="_blank"
					>https://usehooks.com/usewindowsize</Link
				>
			</li>
			<li>
				<Link href="https://usehooks-ts.com/react-hook/use-window-size" target="_blank"
					>https://usehooks-ts.com/react-hook/use-window-size</Link
				>
			</li>
			<li>
				<Link href="https://vueuse.org/core/useWindowSize/" target="_blank"
					>https://vueuse.org/core/useWindowSize/</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				The current window dimensions are:{" "}
				<code>{JSON.stringify({ width: $windowSize.width, height: $windowSize.height })}</code>
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
