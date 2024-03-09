<script lang="ts">
	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";
	import { useScreen } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	const screen = useScreen();
</script>

<DocTpl title="useScreen">
	<div slot="description">
		<p>
			Get the size of your screen. At the moment just get the screen size at the first load, does
			not exists listener to get the screen on change the screen, but it is planned to the next
			iteration.
		</p>
		<p>
			It is inspired on <Link href="https://usehooks-ts.com/react-hook/use-screen" target="_blank"
				>https://usehooks-ts.com/react-hook/use-screen</Link
			>
		</p>

		<H2>TODO</H2>
		<ul class="list-disc pl-6">
			<li>Listen on change the screen</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				The current window dimensions are:{" "}
				<code>
					{JSON.stringify({ width: screen?.width, height: screen?.height })}
				</code>
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
