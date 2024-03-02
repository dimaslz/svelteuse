<script lang="ts">
	import { onMount } from "svelte";

	import { DocTpl, H2, Highlight } from "@/components";
	import Browser from "@/components/browser/Browser.svelte";
	import { useIntervalFn, useState } from "@/hooks";

	import code from "./code-snippet";

	const [counter, updateCounter] = useState<number>(0);
	const intervalInstance = useIntervalFn(() => {
		updateCounter((prevValue) => prevValue + 1);
	}, 200);

	onMount(() => {
		return () => {
			intervalInstance();
		};
	});
</script>

<DocTpl title="useIntervalFn">
	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<p>
				Update number every 200ms is <code>{$counter}</code>
			</p>
		</Browser>
	</div>

	<div slot="code-example">
		<H2>Code example</H2>

		<Highlight {code} />
	</div>
</DocTpl>
