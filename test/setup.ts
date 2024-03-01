import "@testing-library/jest-dom";

import type { Navigation, Page } from "@sveltejs/kit";
import { readable } from "svelte/store";
import { vi } from "vitest";

// import * as environment from "$app/environment";
import * as navigation from "$app/navigation";
import * as stores from "$app/stores";

// Mock SvelteKit runtime module $app/environment
// vi.mock("$app/environment", (): typeof environment => ({
// 	browser: false,
// 	dev: true,
// 	prerendering: false,
// }));

// Mock SvelteKit runtime module $app/navigation
vi.mock("$app/navigation", (): typeof navigation => ({
	afterNavigate: () => {},
	beforeNavigate: () => {},
	disableScrollHandling: () => {},
	goto: () => Promise.resolve(),
	invalidate: () => Promise.resolve(),
	invalidateAll: () => Promise.resolve(),
	prefetch: () => Promise.resolve(),
	prefetchRoutes: () => Promise.resolve(),
}));

// Mock SvelteKit runtime module $app/stores
vi.mock("$app/stores", (): typeof stores => {
	const getStores: typeof stores.getStores = () => {
		const navigating = readable<Navigation | null>(null);
		const page = readable<Page>({
			url: new URL("http://localhost/home"),
			params: {},
			routeId: null,
			status: 200,
			error: null,
			data: {},
		});
		const updated = { subscribe: readable(false).subscribe, check: () => false };

		return { navigating, page, updated };
	};

	const page: typeof stores.page = {
		subscribe(fn) {
			return getStores().page.subscribe(fn);
		},
	};
	const navigating: typeof stores.navigating = {
		subscribe(fn) {
			return getStores().navigating.subscribe(fn);
		},
	};
	const updated: typeof stores.updated = {
		subscribe(fn) {
			return getStores().updated.subscribe(fn);
		},
		check: () => false,
	};

	return {
		getStores,
		navigating,
		page,
		updated,
	};
});
