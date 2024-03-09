<script lang="ts">
	import { Browser, DocTpl, H2, Highlight } from "@/components";
	import { useState, useTimeoutFn } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	const [counter, updateCounter] = useState<number>(0);
	useTimeoutFn(() => {
		updateCounter((prevValue) => prevValue + 1);
	}, 2000);
</script>

<DocTpl title="useTimeoutFn">
	<div slot="description">
		<p>Simple hook to execute a function after a time defined.</p>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<p>
				Update number after 2 seconds: <code>{$counter}</code>
			</p>
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
