<script lang="ts">
	import { onMount } from "svelte";

	import { DocTpl, H2, Highlight } from "@/components";
	import Browser from "@/components/browser/Browser.svelte";
	import { useHover } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	let hoverRef: HTMLElement;
	const [isHover, setElement] = useHover();

	onMount(() => {
		setElement(hoverRef);
	});
</script>

<DocTpl title="useHover">
	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div class="space-y-2">
				<p>
					isHover? <code>{$isHover}</code>
				</p>

				<div
					class={[
						"w-full h-24 flex items-center justify-center",
						$isHover ? "bg-gray-900" : "bg-gray-800",
					].join(" ")}
					bind:this={hoverRef}
				>
					<div class="text-gray-600">hover your mouse here</div>
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
