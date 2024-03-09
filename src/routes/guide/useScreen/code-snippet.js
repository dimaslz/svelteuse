export const exampleCode = `
<!-- javascript -->
<script lang="ts">
import { useScreen } from "@/hooks";

const screen = useScreen();
</script>

<!-- html -->
<div>
	The current window dimensions are:
	<code>
		{JSON.stringify({ width: $screen?.width, height: $screen?.height })}
	</code>
</div>
`;

export const sourceCode = `
export function useScreen(): Partial<Screen> {
	const getScreen = (): Partial<Screen> => {
		if (typeof window !== "undefined" && window.screen) {
			return window.screen;
		}

		return {
			width: 0,
			height: 0,
		};
	};

	return getScreen();
}
`;
