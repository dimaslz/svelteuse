export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useIsClient } from "@dimaslz/svelteuse";

	const isClient = useIsClient();
</script>

<!-- html -->
<div>
	We are in client side?: {isClient}
</div>
`;

export const sourceCode = `
import { isClient } from "@/utils/is-client";

export function useIsClient() {
	return isClient();
}
`;
