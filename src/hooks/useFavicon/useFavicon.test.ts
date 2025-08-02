import { render } from "@testing-library/svelte";
import { tick } from "svelte";
import { beforeEach, describe, expect, it } from "vitest";

import FaviconTest from "./useFaviconTest.test.svelte";

describe("useFavicon", () => {
	beforeEach(() => {
		document.head.innerHTML = ""; // reset favicon between tests
	});

	it("adds a new favicon if none exists", async () => {
		render(FaviconTest, { url: "/my-favicon.ico" });
		await tick();

		const link = document.querySelector('link[rel="icon"]');

		expect(link).not.toBeNull();
		expect(link?.getAttribute("href")).toBe("/my-favicon.ico");
	});

	it("updates existing favicon href", async () => {
		render(FaviconTest, { url: "/new.ico" });
		await tick();

		const existing = document.createElement("link");
		existing.setAttribute("rel", "icon");
		existing.setAttribute("href", "/old.ico");

		document.head.appendChild(existing);

		const link = document.querySelector('link[rel="icon"]');

		expect(link).not.toBeNull();
		expect(link?.getAttribute("href")).toBe("/new.ico");
	});
});
