<script lang="ts">
	import "./theme.css";
	import "./prism-highlight-code";

	import Prism from "prismjs";

	export let code: string = "";

	let html: string = "";
	html = Prism.highlight(code, Prism.languages.svelte, "svelte");
</script>

<div>
	<div class="p-4 bg-gray-950">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<pre class="text-xs overflow-x-scroll"><code>{@html `${html.trim()}\n\n`}</code></pre>
	</div>
</div>
