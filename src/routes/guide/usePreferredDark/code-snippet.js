export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { usePreferredDark } from "@dimaslz/svelteuse";

	const prefferredDark = usePreferredDark();
</script>

<!-- html -->
<div>
  <pre>{JSON.stringify({ prefferredDark: $prefferredDark }, null, 2)}</pre>
</div>
`;

export const sourceCode = `
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function usePreferredDark() {
	const { matches } = useMediaQuery('(prefers-color-scheme: dark)');

	return matches;
};
`;
