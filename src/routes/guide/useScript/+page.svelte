<script lang="ts">
	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";
	import { useScript } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	const status = useScript(`https://code.jquery.com/jquery-3.5.1.min.js`, {
		removeOnUnmount: true,
	});
</script>

<DocTpl title="useScript">
	<div slot="description">
		<p>Inject a script easily with this hook.</p>

		<h3 class="text-lg">Related hooks:</h3>
		<ul class="list-disc pl-6">
			<li><Link href="/guide/useState">useState</Link></li>
		</ul>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks.com/usescript" target="_blank"
					>https://usehooks.com/usescript</Link
				>
			</li>
			<li>
				<Link href="https://usehooks-ts.com/react-hook/use-script" target="_blank"
					>https://usehooks-ts.com/react-hook/use-script</Link
				>
			</li>
			<li>
				<Link href="https://vueuse.org/core/useScriptTag/" target="_blank"
					>https://vueuse.org/core/useScriptTag/</Link
				>
			</li>
		</ul>

		<H2 class="pt-12">TODO</H2>
		<ul class="pl-6 list-disc"><li>Allow inject multiple scripts at the same time.</li></ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				<code>
					{$status}
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
