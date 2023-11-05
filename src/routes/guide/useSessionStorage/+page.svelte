<script lang="ts">
	import { Browser, DocTpl, H2, Highlight } from "@/components";
	import { Button } from "@/components";
	import { useSessionStorage } from "@/hooks";

	import code from "./code-snippet";

	const [storageValue, updateSessionStorage] = useSessionStorage<boolean>(
		"dimaslz-svelteuse",
		true,
	);

	const toggleTheme = () => {
		updateSessionStorage((prevValue) => {
			return !prevValue;
		});
	};
</script>

<DocTpl title="useSessionStorage">
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
