import { get } from "svelte/store";

import { useDocumentTitle } from "@/hooks";

describe("Hooks - useDocumentTitle", () => {
	test("update document title", () => {
		const initTitle = "init title";
		const newTitle = "init title";

		const [title, updateTitle] = useDocumentTitle(initTitle);

		expect(get(title)).toBe(initTitle);
		expect(window.document.title).toBe(initTitle);

		updateTitle(newTitle);

		expect(window.document.title).toBe(newTitle);
		expect(get(title)).toBe(newTitle);
	});
});
