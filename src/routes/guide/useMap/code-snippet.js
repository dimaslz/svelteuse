export default `
<!-- javascript -->
<script lang="ts">
	import { get } from "svelte/store";
	import { type MapOrEntries, useMap } from "@dimaslz/svelteuse";

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

<!-- html -->
<div>
	<button on:click={set}>Add</button>
	<button on:click={reset}>Reset</button>
	<button on:click={setAll}>Set new data</button>
	<button on:click={remove} disabled={!$map.get("hello")}>
		{'Remove "hello"'}
	</button>

	<pre>{JSON.stringify(arrayValue, null, 2)}</pre>
	<pre>
		{#each arrayValue as value, index}
			<code>{\`\n  \${index}: \${value}\`}</code>
		{/each}
		<br />
	</pre>
</div>
`;
