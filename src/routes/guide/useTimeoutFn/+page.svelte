<script lang="ts">
	import { Browser, DocTpl, H2, Highlight } from "@/components";
	import { useState, useTimeoutFn } from "@/hooks";

	import code from "./code-snippet";

	const [counter, updateCounter] = useState<number>(0);
	useTimeoutFn(() => {
		updateCounter((prevValue) => prevValue + 1);
	}, 2000);
</script>

<DocTpl title="useTimeoutFn">
	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<p>
				Update number after 2 seconds: <code>{$counter}</code>
			</p>
		</Browser>
	</div>

	<div slot="code-example">
		<H2>Code example</H2>

		<Highlight {code} />
	</div>
</DocTpl>
