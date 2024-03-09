<script lang="ts">
	import { get } from "svelte/store";

	import { Browser, Button, DocTpl, H2, Highlight, Link } from "@/components";
	import { type MapOrEntries, useMap } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	const initialValues: MapOrEntries<string, string> = [["key", "🆕"]];
	const otherValues: MapOrEntries<string, string> = [
		["hello", "👋"],
		["data", "📦"],
	];

	const { map, actions } = useMap<string, string>(initialValues);

	let arrayValue = Array.from(get(map).entries());

	map.subscribe((newMap) => {
		arrayValue = Array.from(newMap.entries());
	});

	const set = () => actions.add(String(Date.now()), "📦");
	const setAll = () => actions.set(otherValues);
	const reset = () => actions.reset();
	const remove = () => actions.remove("hello");
</script>

<DocTpl title="useMap">
	<div slot="description">
		<p>
			Manage <code>Map</code> easily with this hook.
		</p>
		<p>Inspired on:</p>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks.com/usemap" target="_blank">https://usehooks.com/usemap</Link>
			</li>
			<li>
				<Link href="https://usehooks-ts.com/react-hook/use-map" target="_blank"
					>https://usehooks-ts.com/react-hook/use-map</Link
				>
			</li>
			<li>
				<Link href="https://vueuse.org/shared/useArrayMap/" target="_blank"
					>https://vueuse.org/shared/useArrayMap/</Link
				>
			</li>
		</ul>
	</div>

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
