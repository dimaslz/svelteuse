<script lang="ts">
	import { Browser, Button, DocTpl, H2, Highlight, Link } from "@/components";
	import { useAsyncState } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	// example
	type InitialState = { id: number | null; title: string; completed: boolean };
	const { state: user, isLoading, isReady, error, execute } = useAsyncState<InitialState>(
    () => fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((r) => r.json()),
      {
        id: null,
        title: '',
        completed: false
      },
    { immediate: false }
  );

  function loadUser() {
    execute().catch(console.error);
  }
</script>

<DocTpl title="useAsyncState">
	<div slot="description">
		<div class="space-y-2">
			<p>
			  The useAsyncState hook is designed to simplify the handling of asynchronous operations (like API calls) in a reactive way. It:
			</p>
			<ul class="pl-4">
			  <li>•	Tracks the loading state (isLoading)</li>
			  <li>•	Captures results (state)</li>
			  <li>•	Signals when data is ready (isReady)</li>
			  <li>•	Handles and stores errors (error)</li>
			  <li>•	Provides an execute() method to trigger or re-trigger the async logic</li>
			</ul>

			<h3 class="text-lg">Inspired on:</h3>
			<ul class="list-disc pl-6">
				<li>
					<Link href="https://vueuse.org/core/useAsyncState">https://vueuse.org/core/useAsyncState</Link>
				</li>
			</ul>
		</div>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
  		<Button on:click={loadUser} disabled={$isLoading}>Load Todo</Button>

      {#if $isLoading}
        <p>Loading...</p>
      {:else if $error}
        <p style="color: red">Error: {$error || String($error)}</p>
      {:else if $isReady}
        <div>
          <h3>Todo #{$user.id}</h3>
          <p>{$user.title} — { $user.completed ? '✅' : '❌' }</p>
        </div>
      {/if}
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
