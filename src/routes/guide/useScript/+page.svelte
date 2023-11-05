<script lang="ts">
	import { Browser, DocTpl, H2, Highlight } from "@/components";
	import { useScript } from "@/hooks";

	import code from "./code-snippet";

	const status = useScript(`https://code.jquery.com/jquery-3.5.1.min.js`, {
		removeOnUnmount: true,
	});
</script>

<DocTpl title="useScript">
	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				<code>
					{$status}
				</code>
			</div>
		</Browser>
	</div>

	<div slot="code-example">
		<H2>Code example</H2>

		<Highlight {code} />
	</div>
</DocTpl>
