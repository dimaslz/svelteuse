export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { onMount } from "svelte";
	import { useClickAnyWhere } from "@dimaslz/svelteuse";

	const someCallback = () => {
		console.log("click anywhere!");
	};

	onMount(() => {
		const eventClickAnyWhere = useClickAnyWhere(someCallback);

		return () => {
			eventClickAnyWhere();
		}
	})
</script>

<!-- html -->
<div>
	content
</div>
`;
export const sourceCode = `
import { useEventListener } from "@/hooks";

type Handler = (event: MouseEvent) => void;

export function useClickAnyWhere(handler: Handler): () => void {
	return useEventListener<MouseEvent>("click", (event) => {
		handler(event);
	});
}
`;
