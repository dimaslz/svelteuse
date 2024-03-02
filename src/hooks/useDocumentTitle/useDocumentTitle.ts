import { type TsetValue, useState } from "@/hooks";

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
