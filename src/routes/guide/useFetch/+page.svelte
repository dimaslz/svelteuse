<script lang="ts">
	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";
	import { useFetch } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	const url = "https://randomdata-api.loremapi.io";

	const fetchResult = useFetch<{ value: boolean }>(url, {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			schema:
				"U2FsdGVkX18yd3+hdSaN0M/OZD8dylEoJZiSl/631HcuqeLfT/37QaxzBf/v0OlJ4yMoW+QxkMRW1IoiUfH+y4BKfv1cV/GS36WHbEgEI3+BCC8Df8O7O3LC6uMgp/50aasoB6I2k3rfFvNfA6V5sLY2aKq4oH9dLrcTwbkDo+s=",
		},
	});
</script>

<DocTpl title="useFetch">
	<div slot="description">
		<p>Make HTTP requests by a hook.</p>

		<h3 class="text-lg">Related hooks</h3>
		<ul class="list-disc pl-6">
			<li><Link href="/guide/useState">useState</Link></li>
		</ul>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://vueuse.org/core/useFetch/">https://vueuse.org/core/useFetch/</Link>
			</li>
			<li>
				<Link href="https://usehooks.com/usefetch">https://usehooks.com/usefetch</Link>
			</li>
			<li>
				<Link href="https://usehooks-ts.com/react-hook/use-fetch"
					>https://usehooks-ts.com/react-hook/use-fetch</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				<div>
					<span class="font-bold">error:</span>
					{JSON.stringify($fetchResult.error, null, 2)}
				</div>
				<div><span class="font-bold">data:</span> {JSON.stringify($fetchResult.data, null, 2)}</div>
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
