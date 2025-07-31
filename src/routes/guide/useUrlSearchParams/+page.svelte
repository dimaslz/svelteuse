<script lang="ts">
	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";
	import { exampleCode, sourceCode } from "./code-snippet";
	import { useUrlSearchParams } from "@/hooks";
	import Button from "@/components/button/Button.svelte";
	import InputText from "@/components/input-text/InputText.svelte";

	// example
	const params = useUrlSearchParams<{
  	page: string;
  	filter: string;
	}>(
	  'history',
		{
        initialValue: { page: '1', filter: '' }
		}
	);
</script>

<DocTpl title="useUrlSearchParams">
	<div slot="description">
		<p>
		  Offers reactive sync between your Svelte state and the browser’s query parameters.
		</p>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://vueuse.org/core/useUrlSearchParams" target="_blank"
				>https://vueuse.org/core/useUrlSearchParams</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
  		<div>
    		<div class="flex">
      		<Button
      		  on:click={() => params.setParams({ page: '2' })}
      		>
     			Go to Page 2
      		</Button>
      		<InputText
      		  bind:value={$params.filter}
       			on:input={() => params.setParams({ filter: $params.filter })} placeholder="write filter here..."
      		/>
        </div>

        <div class="flex flex-col">
      		<p>Page: {$params.page}</p>
      		<p>Filter: {$params.filter}</p>
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
