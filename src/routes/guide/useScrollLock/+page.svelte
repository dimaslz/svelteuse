<script lang="ts">
	import { Browser, Button, DocTpl, H2, Highlight, Link } from "@/components";
	import { useScrollLock } from "@/hooks/useScrollLock/useScrollLock";

	import { exampleCode, sourceCode } from "./code-snippet";

	// example
	let modalOpen = false;
  const { isLocked, set } = useScrollLock();

  $: set(modalOpen);
</script>

<DocTpl title="useScrollLock">
	<div slot="description">
		<div class="space-y-2">
			<p>
			  The useScrollLock hook is used to prevent scrolling on a page or a specific element — typically by setting overflow: hidden on the target.
			</p>

			<h3 class="text-lg">Inspired on:</h3>
			<ul class="list-disc pl-6">
				<li>
					<Link href="https://usehooks.com/useobjectstate">https://usehooks.com/useobjectstate</Link>
				</li>
			</ul>
		</div>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
  		<Button on:click={() => (modalOpen = true)}>Open Modal</Button>

      {#if modalOpen}
        <div
          class="fixed inset-0 bg-gray-950/50 flex items-center justify-center z-10"
        >
          <div
            class="bg-gray-600 my-2 mx-auto p-4 w-[300px] text-white"
          >
            <p>Modal is open!</p>
            <Button
              on:click={(e) => {
                e.stopPropagation();
                modalOpen = false;
              }}
            >Close</Button>
          </div>
        </div>
      {/if}

      {#if $isLocked}
        <p class="p-4">Body Scrolling is locked</p>
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
