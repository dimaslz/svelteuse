export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useDarkMode } from "@dimaslz/svelteuse";

	const { isDarkMode, toggle, enable, disable } = useDarkMode(false);
</script>

<!-- html -->
<div
	class={[
		"p-4",
		$isDarkMode ? "bg-[#212121] text-white" : "bg-white text-gray-800"
	].join(" ")}
>
	<p class="pb-6">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, repellendus optio?
		Possimus quod velit corrupti, repellendus veritatis, sequi dicta natus necessitatibus
		architecto aut reprehenderit iure ducimus eligendi sunt animi illo.
	</p>
	<Button on:click={toggle}>toggle schema mode</Button>
</div>

`;

export const sourceCode = `
import { get } from "svelte/store";

import { useLocalStorage, useMediaQuery } from "@dimaslz/svelteuse"

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

interface UseDarkModeOutput {
	isDarkMode: SvelteStore<boolean>;
	toggle: () => void;
	enable: () => void;
	disable: () => void;
}

export function useDarkMode(defaultValue?: boolean): UseDarkModeOutput {
	const { matches: isDarkOS } = useMediaQuery(COLOR_SCHEME_QUERY);

	const { store: isDarkMode, update: setDarkMode } = useLocalStorage<boolean>(
		"dark-mode",
		defaultValue ?? get(isDarkOS) ?? false,
	);

	return {
		isDarkMode,
		toggle: () => setDarkMode((prev) => !prev),
		enable: () => setDarkMode(true),
		disable: () => setDarkMode(false),
	};
}
`;
