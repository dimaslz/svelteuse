export default `
<!-- javascript -->
<script lang="ts">
	import { useDocumentTitle } from "@dimaslz/svelteuse";

	const [title, updateTitle] = useDocumentTitle("site title");

	const onInput = ($event: Event) => {
		const { value } = $event.target as HTMLInputElement;

		updateTitle(value);
	};
</script>

<!-- html -->
<div>
	<p>
		Value is <code>{$title}</code>
	</p>
	<div>
		<input on:input={onInput} />
	</div>
</div>
`;
