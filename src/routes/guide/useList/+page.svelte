<script lang="ts">
	import { Button, InputText, Browser, DocTpl, H2, Highlight, Link } from "@/components";
	import { sourceCode, exampleCode } from "./code-snippet";
	import { useList } from "@/hooks";

	// example
	let input = '';

	const { list: todos, push, removeAt, clear } = useList<string>([]);
</script>

<DocTpl title="useList">
	<div slot="description">
		<p>Easily handle array-based content with the useList hook for adding, updating, and removing items.</p>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks.com/uselist">https://usehooks.com/uselist</Link>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				<div class="flex w-96 h-12">
					<InputText bind:value={input} placeholder="Add todo" />
					<Button on:click={() => { if (input) { push(input); input = ''; } }}>
						Add
					</Button>
					<Button on:click={clear}>Clear All</Button>
				</div>

				{#if $todos.length === 0}
					<div class="p-4">no items on the list</div>
				{/if}

				{#if $todos.length > 0}
					<ul class="w-96 p-4">
						{#each $todos as todo, i}
							<li class="w-full flex items-center">
								<div class="w-full">{todo}</div>
								<Button on:click={() => removeAt(i)}>Remove</Button>
							</li>
						{/each}
					</ul>
				{/if}
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
