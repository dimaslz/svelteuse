export const exampleCode = `
<script lang="ts">
	import { useFetch } from "@dimaslz/svelte-hooks";

	const url = "https://randomdata-api.loremapi.io";

	const fetchResult = useFetch<{ value: boolean }>(url, {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			schema:
				"U2FsdGVkX18yd3+hdSaN0M/OZD8dylEoJZiSl/631HcuqeLfT/37QaxzBf/v0OlJ4yMoW+QxkMRW1IoiUfH+y4BKfv1cV/GS36WHbEgEI3+BCC8Df8O7O3LC6uMgp/50aasoB6I2k3rfFvNfA6V5sLY2aKq4oH9dLrcTwbkDo+s=",
		},
	});
</script>


<div>
	<div>error: {JSON.stringify($fetchResult.error, null, 2)}</div>
	<div>data: {JSON.stringify($fetchResult.data, null, 2)}</div>
</div>
`;

export const sourceCode = `
import { useState } from "@dimaslz/svelteuse"

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

	// Do nothing if the url is not given
	if (!url) return state;

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

	if (typeof window === "object") {
		void fetchData();
	}

	return state;
}
`;
