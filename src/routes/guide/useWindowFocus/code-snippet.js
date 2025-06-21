export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useWindowFocus } from "@dimaslz/svelteuse";

	const isFocused = useWindowFocus();
</script>

<!-- html -->
<div>
	<p>Window focused? {$isFocused ? 'Yes' : 'No'}</p>
</div>
`;

export const sourceCode = `import { readable } from 'svelte/store';

type UseWindowFocusOptions = {
	window?: Window;
};

export function useWindowFocus(options: UseWindowFocusOptions = {}) {
	const win = options.window ?? (typeof window !== 'undefined' ? window : undefined);

	return readable<boolean>(false, (set) => {
		if (!win || !win.document) {
			return;
		}

		set(win.document.hasFocus());

		const onFocus = () => set(true);
		const onBlur = () => set(false);

		win.addEventListener('focus', onFocus, { passive: true });
		win.addEventListener('blur', onBlur, { passive: true });

		return () => {
			win.removeEventListener('focus', onFocus);
			win.removeEventListener('blur', onBlur);
		};
	});
}
`;
