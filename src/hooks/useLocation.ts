import { writable } from "svelte/store";

import { page } from "$app/stores";

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

export const useLocation = (): SvelteStore<URL> => {
	const { subscribe, update } = writable<URL>(INITIAL_URL as URL);

	page.subscribe(({ url }) => {
		update(() => url);
	});

	return { subscribe };
};
