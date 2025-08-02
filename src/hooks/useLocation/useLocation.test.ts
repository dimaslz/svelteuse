import { get } from "svelte/store";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useLocation } from "./useLocation";

describe("useLocation", () => {
	const originalLocation = window.location;
	const originalHistory = window.history;

	beforeEach(() => {
		// @ts-ignore override readonly
		delete window.location;
		window.location = {
			hash: "#test",
			host: "localhost:3000",
			hostname: "localhost",
			href: "http://localhost:3000/#test",
			pathname: "/",
			port: "3000",
			protocol: "http:",
			search: "?query=value",
			assign: vi.fn(),
			reload: vi.fn(),
			replace: vi.fn(),
		} as any;

		// Mock window.history
		const fakeHistory = {
			state: { foo: "bar" },
			length: 42,
		};

		Object.defineProperty(window, "history", {
			value: fakeHistory,
			configurable: true,
		});
	});

	afterEach(() => {
		// Restore original location and history
		window.location = originalLocation;
		Object.defineProperty(window, "history", {
			value: originalHistory,
			configurable: true,
		});
	});

	it("should initialize with the current location state", () => {
		const location = useLocation();
		const state = get(location);

		expect(state).toMatchObject({
			trigger: "load",
			length: 5,
			origin: undefined, // `location.origin` isn't mocked
			hash: "#test",
			host: "localhost:3000",
			hostname: "localhost",
			href: "http://localhost:3000/#test",
			pathname: "/",
			port: "3000",
			protocol: "http:",
			search: "?query=value",
		});
	});

	it("should update on popstate event", () => {
		const location = useLocation();

		// Update mock location
		window.location.hash = "#changed";
		window.dispatchEvent(new PopStateEvent("popstate"));

		const state = get(location);
		expect(state.trigger).toBe("popstate");
		expect(state.hash).toBe("#changed");
	});

	it("should update on hashchange event", () => {
		const location = useLocation();

		window.location.hash = "#another";
		window.dispatchEvent(new HashChangeEvent("hashchange"));

		const state = get(location);
		expect(state.trigger).toBe("hashchange");
		expect(state.hash).toBe("#another");
	});

	it.todo("should reflect changes to writable props in location", async () => {
		const location = useLocation();

		location.update((prev) => ({ ...prev, pathname: "/new-path" }));

		expect(window.location.pathname).toBe("/new-path");
	});
});
