<script lang="ts">
	import { Button, DocTpl, H2, Highlight } from "@/components";
	import Browser from "@/components/browser/Browser.svelte";
	import { useInterval } from "@/hooks";

	import code from "./code-snippet";

	const counter = useInterval(200);
	const { isActive, state: counter2, reset, pause, resume } = useInterval(200, { controls: true });
</script>

<DocTpl title="useInterval">
	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<p>
				Update number every 200ms without controls: <code>{$counter}</code>
			</p>

			<div>
				<p>
					Update number every 200ms with controls: <code>{$counter2}</code>
				</p>

				<p>
					is active: {$isActive}
				</p>

				<div>
					<Button on:click={pause}>pause</Button>
					<Button on:click={resume}>resume</Button>
					<Button on:click={reset}>reset</Button>
				</div>
			</div>
		</Browser>
	</div>

	<div slot="code-example">
		<H2>Code example</H2>

		<Highlight {code} />
	</div>
</DocTpl>
