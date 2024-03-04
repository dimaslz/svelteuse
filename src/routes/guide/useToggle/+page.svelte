<script lang="ts">
	import { get } from "svelte/store";

	import { Browser, Button, DocTpl, H2, Highlight } from "@/components";
	import { useToggle } from "@/hooks";

	import code from "./code-snippet";

	const { value, toggle, update } = useToggle();

	const customToggle = () => {
		update(!get(value));
	};
</script>

<DocTpl title="useToggle">
	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				<p>
					Value <code>{$value}</code>
				</p>
			</div>

			<div>
				<Button on:click={toggle}>toggle value</Button>
				<Button on:click={customToggle}>custom toggle</Button>
			</div>
		</Browser>
	</div>

	<div slot="code-example">
		<H2>Code example</H2>

		<Highlight {code} />
	</div>
</DocTpl>
