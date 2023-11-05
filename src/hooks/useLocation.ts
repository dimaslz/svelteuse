import { writable } from "svelte/store";

import { useEventListener } from "@/hooks/useEventListener";
import { page } from "$app/stores";

const WRITABLE_PROPERTIES = [
	"hash",
	"host",
	"hostname",
	"href",
	"pathname",
	"port",
	"protocol",
	"search",
] as const;

const INITIAL_URL: Partial<URL> = {
	hash: "",
	host: "",
	hostname: "",
	href: "",
	origin: "",
	password: "",
	pathname: "",
	port: "",
	protocol: "",
	search: "",
	searchParams: {
		size: 0,
	} as any,
};

export interface ConfigurableLocation {
	/*
	 * Specify a custom `location` instance, e.g. working with iframes or in testing environments.
	 */
	location?: Location;
}

export interface ConfigurableWindow {
	/*
	 * Specify a custom `window` instance, e.g. working with iframes or in testing environments.
	 */
	window?: Window;
}

export interface BrowserLocationState {
	readonly trigger: string;
	readonly state?: any;
	readonly length?: number;
	readonly origin?: string;
	hash?: string;
	host?: string;
	hostname?: string;
	href?: string;
	pathname?: string;
	port?: string;
	protocol?: string;
	search?: string;
}

export function useLocation(options: ConfigurableWindow = {}): SvelteStore<URL> {
	// const { window = defaultWindow } = options;
	// const refs = Object.fromEntries(WRITABLE_PROPERTIES.map((key) => [key, ref()])) as Record<
	// 	(typeof WRITABLE_PROPERTIES)[number],
	// 	SvelteStore<string | undefined>
	// >;

	const { subscribe, update } = writable<URL>(INITIAL_URL as URL);

	page.subscribe(({ url }) => {
		update(() => url);
	});

	const buildState = (trigger: string) => {
		console.log("buildState", trigger);
		// const { state, length } = window?.history || {};
		// const { origin } = window?.location || {};
		// for (const key of WRITABLE_PROPERTIES) refs[key].value = window?.location?.[key];

		return "";
	};

	const state: any = buildState("load");

	const onPopstate = function (trigger: string) {
		console.log("onPopstate", trigger);
		// state = buildState("popstate");
	};

	const onHashChange = function (trigger: string) {
		console.log("onHashChange", trigger);
		// state = buildState("popstate");
	};

	if (typeof window !== "undefined") {
		console.log("AAAA");
		useEventListener("popstate", onPopstate, window);
		useEventListener("hashchange", onHashChange, window);
	}

	return { subscribe };
}
