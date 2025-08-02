<script lang="ts">
	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";

	import { exampleCode, sourceCode } from "./code-snippet";
	import { usePreferredLanguage } from "@/hooks";

	// example
	const language = usePreferredLanguage();
</script>

<DocTpl title="usePreferredLanguage">
	<div slot="description">
		<p>Adapt to user language preferences dynamically with usePreferredLanguage.</p>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks.com/usepreferredlanguage" target="_blank"
					>https://usehooks.com/usepreferredlanguage</Link
				>
			</li>
			<li>
				<Link href="https://vueuse.org/core/usePreferredLanguages" target="_blank"
					>https://vueuse.org/core/usePreferredLanguages</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				<p>Preferred language: {$language}</p>
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
