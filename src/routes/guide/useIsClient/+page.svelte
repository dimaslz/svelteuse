<script lang="ts">
	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";

	import { exampleCode, sourceCode } from "./code-snippet";
	import { useIsClient } from "@/hooks";

	const isClient = useIsClient();
</script>

<DocTpl title="useIsClient">
	<div slot="description">
		<p>Custom hook that determines if the code is running on the client side (in the browser).</p>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks-ts.com/react-hook/use-is-client" target="_blank"
					>https://usehooks-ts.com/react-hook/use-is-client</Link
				>
			</li>
			<li>
				<Link href="https://usehooks.com/useisclient" target="_blank"
					>https://usehooks.com/useisclient</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				We are in client side?: {isClient}
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
