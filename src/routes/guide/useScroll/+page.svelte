<script lang="ts">
	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";

	// example
	import { exampleCodeA, exampleCodeB, sourceCode } from "./code-snippet";
</script>

<DocTpl title="useScroll">
	<div slot="description">
		<p>Track and manipulate the scroll position of the window or of a element with useScroll.</p>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks.com/usewindowscroll" target="_blank"
					>https://usehooks.com/usewindowscroll</Link
				>
			</li>
			<li>
				<Link href="https://vueuse.org/core/useScroll" target="_blank"
					>https://vueuse.org/core/useScroll</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example" class="space-y-6">
		<div>
			<H2>Visual example (scrollable element)</H2>

			<Browser body="p-4 bg-gray-950/50 overflow-y-scroll h-[700px]">
				<iframe
					src="/demos/use-scroll-element"
					frameborder="0"
					width="100%"
					height="100%"
					title="useScroll Demo for element"
				/>
			</Browser>
		</div>

		<div>
			<H2>Visual example (scroll window)</H2>

			<Browser body="p-4 bg-gray-950/50 overflow-y-scroll h-[700px]">
				<iframe
					src="/demos/use-scroll-window"
					frameborder="0"
					width="100%"
					height="100%"
					title="useScroll Demo for window"
				/>
			</Browser>
		</div>
	</div>

	<div slot="code-example">
		<div>
			<H2>Code base</H2>

			<Highlight language="typescript" code={sourceCode} />
		</div>

		<div class="mt-12">
			<H2>Code example (scroll window)</H2>

			<Highlight code={exampleCodeA} />
		</div>

		<div class="mt-12">
			<H2>Code example (scrollable element)</H2>

			<Highlight code={exampleCodeB} />
		</div>
	</div>
</DocTpl>
