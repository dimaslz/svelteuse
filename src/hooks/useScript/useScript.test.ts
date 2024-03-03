import { render } from "@testing-library/svelte";

import UseScript from "./useScript.svelte";

describe("Hooks - useScript", () => {
	test("inject a url", async () => {
		const scriptSrc = `https://code.jquery.com/jquery-3.5.1.min.js`;
		render(UseScript, { scriptSrc });

		expect(document.body.querySelector("script")?.src).toBe(scriptSrc);
	});
});
