import { onMount } from "svelte";

import { type TsetValue, useState } from "@/hooks/useState";

type UseStateOutput = [SvelteStore<string>, TsetValue<string>];

export function useDocumentTitle(title?: string): UseStateOutput {
	const [_title, updateTitle] = useState<string>(title || "");

	onMount(() => {
		if (typeof window === "undefined") {
			return;
		}

		_title.subscribe((newTitle) => {
			window.document.title = newTitle;
		});
	});

	return [_title, updateTitle];
}
