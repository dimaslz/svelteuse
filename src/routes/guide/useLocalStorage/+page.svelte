<script lang="ts">
	import { Browser, DocTpl, H2, Highlight } from "@/components";
	import { Button } from "@/components";
	import { useLocalStorage } from "@/hooks";

	import code from "./code-snippet";

	const [storageValue, updateLocalStorage] = useLocalStorage<boolean>("dimaslz-svelteuse", true);

	const toggleTheme = () => {
		updateLocalStorage((prevValue) => {
			return !prevValue;
		});
	};
</script>

<DocTpl title="useLocalStorage">
	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<p>
				Value is <code>{JSON.stringify($storageValue)}</code>
			</p>
			<Button on:click={toggleTheme}>update state</Button>
		</Browser>
	</div>

	<div slot="code-example">
		<H2>Code example</H2>

		<Highlight {code} />
	</div>
</DocTpl>
