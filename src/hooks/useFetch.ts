import { onMount } from "svelte";

import { useState } from "@/hooks/useState";

interface State<T> {
	data?: T;
	error?: {
		message: string;
		error: Error;
	};
}

type Cache<T> = { [url: string]: T };

export function useFetch<T = unknown>(url?: string, options?: RequestInit): SvelteStore<State<T>> {
	const cache: Cache<T> = {};

	// Used to prevent state update if the component is unmounted
	let cancelRequest: boolean = false;

	const initialState: State<T> = {
		error: undefined,
		data: undefined,
	};

	const dispatch = (state: State<T>) => {
		updateState((prev: State<T>) => ({ ...prev, ...state }));
	};

	const [state, updateState] = useState<State<T>>(initialState);

	onMount(() => {
		// Do nothing if the url is not given
		if (!url) return;

		cancelRequest = false;

		const fetchData = async () => {
			dispatch(initialState);

			// If a cache exists for this url, return it
			if (cache[url]) {
				dispatch({ data: cache[url] });
				return;
			}

			try {
				const response = await fetch(url, options);
				if (!response.ok) {
					throw new Error(response.statusText);
				}

				const data = (await response.json()) as T;
				cache[url] = data;
				if (cancelRequest) return;

				dispatch({ data });
			} catch (error: any) {
				if (cancelRequest) return;

				dispatch({
					error: {
						message: error.message,
						error,
					},
				} as { error: { message: string; error: Error } });
			}
		};

		void fetchData();

		return () => {
			cancelRequest = true;
		};
	});

	return state;
}
