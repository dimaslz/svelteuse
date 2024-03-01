<script>
	import { H1, H2, Highlight, Link } from "@/components";

	import { demo } from "./code-snippets";
</script>

<!-- eslint-disable no-useless-escape -->
<div class="w-full">
	<H1>Installation</H1>

	<div class="space-y-4 text-base">
		<p>
			SvelteUse is a Svelte hooks library, written in Typescript and easy to use. As with Svelte is
			possible to work as React hooks and Vue composables, I was inpired to make this project in <Link
				href="https://usehooks.com"
				target="_blank">https://usehooks.com</Link
			>, <Link href="https://usehooks-ts.com" target="_blank">https://usehooks-ts.com</Link> and <Link
				href="https://vueuse.org"
				target="_blank">https://vueuse.org</Link
			>.
		</p>
	</div>

	<div class="space-y-4 mt-6">
		<div>
			<Highlight
				code={`
		$ npm add @dimaslz/svelteuse`}
			/>
		</div>

		<div>
			<H2>How to use in code</H2>
			<Highlight code={demo} />
		</div>
	</div>
</div>
