<script lang="ts">
	import { Browser, DocTpl, H2, Highlight } from "@/components";
	import { Button } from "@/components";
	import { useLocalStorage } from "@/hooks";

	import code from "./code-snippet";

	const { store, update, reset, clear } = useLocalStorage<boolean>("dimaslz-svelteuse", true);

	const toggleTheme = () => {
		update((prevValue) => {
			return !prevValue;
		});
	};
</script>

<DocTpl title="useLocalStorage">
	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<p>
				Value is <code>{JSON.stringify($store)}</code>
			</p>
			<Button on:click={toggleTheme}>update state</Button>
			<Button on:click={reset}>reset state</Button>
			<Button on:click={clear}>clear state</Button>
		</Browser>
	</div>

	<div slot="code-example">
		<H2>Code example</H2>

		<Highlight {code} />
	</div>
</DocTpl>
