<script lang="ts">
	import { get } from "svelte/store";

	import { Browser, Button, DocTpl, H2, Highlight } from "@/components";
	import { type MapOrEntries, useMap } from "@/hooks";

	import code from "./code-snippet";

	const initialValues: MapOrEntries<string, string> = [["key", "🆕"]];
	const otherValues: MapOrEntries<string, string> = [
		["hello", "👋"],
		["data", "📦"],
	];

	const [map, actions] = useMap<string, string>(initialValues);

	let arrayValue = Array.from(get(map).entries());

	map.subscribe((newMap) => {
		arrayValue = Array.from(newMap.entries());
	});

	const set = () => actions.set(String(Date.now()), "📦");
	const setAll = () => actions.setAll(otherValues);
	const reset = () => actions.reset();
	const remove = () => actions.remove("hello");
</script>

<DocTpl title="useMap">
	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				<Button on:click={set}>Add</Button>
				<Button on:click={reset}>Reset</Button>
				<Button on:click={setAll}>Set new data</Button>
				<Button on:click={remove} disabled={!$map.get("hello")}>
					{'Remove "hello"'}
				</Button>

				<pre>{JSON.stringify(arrayValue, null, 2)}</pre>
				<pre>
					{#each arrayValue as value, index}
						<code>{`\n  ${index}: ${value}`}</code>
					{/each}
					<br />
				</pre>
			</div>
		</Browser>
	</div>

	<div slot="code-example">
		<H2>Code example</H2>

		<Highlight {code} />
	</div>
</DocTpl>
