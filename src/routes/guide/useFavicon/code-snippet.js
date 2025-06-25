export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { onMount } from "svelte";
	import { useFavicon } from "@dimaslz/svelteuse";

	onMount(() => {
		useFavicon("/icon-page.ico");
	})
</script>
`;

export const sourceCode = `import { onMount } from "svelte";
import { tick } from "svelte";

export function useFavicon(url: string) {
	onMount(async () => {
		await tick(); // ensure DOM is ready

		let link: HTMLLinkElement | null = document.querySelector('link[rel~="icon"]');

		if (!url) return;

		if (!link) {
			link = document.createElement("link");
			link.type = "image/x-icon";
			link.rel = "icon";
			link.href = url;
			document.head.appendChild(link);
		} else {
			link.href = url;
		}
	});
}
`;
