export const exampleCode = `
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

export const sourceCode = `
import { type TsetValue, useState } from "@dimaslz/svelteuse"

type UseStateOutput = [SvelteStore<string>, TsetValue<string>];

export function useDocumentTitle(title?: string): UseStateOutput {
	const [_title, updateTitle] = useState<string>(title || "");

	if (typeof window !== "undefined") {
		_title.subscribe((newTitle) => {
			window.document.title = newTitle;
		});
	}

	return [_title, updateTitle];
}
`;
