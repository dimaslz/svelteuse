import { onMount } from "svelte";

import { useState } from "@/hooks";

type AnyFn = (...args: any[]) => any;

export function useTimeoutFn<CallbackFn extends AnyFn>(
	callback: CallbackFn,
	interval: number | undefined = 1000,
	options: { component?: boolean; cancelOnUnmount?: boolean; immediate?: boolean } = {},
) {
	const { component = true, cancelOnUnmount = true, immediate = true } = options;

	const [isPending, setIsPending] = useState(false);
	let timer: ReturnType<typeof setTimeout> | null = null;

	const clear = () => {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	};

	const stop = () => {
		setIsPending(false);
		clear();
	};

	const start = (...args: Parameters<CallbackFn> | []) => {
		setIsPending(true);
		clear();
		timer = setTimeout(() => {
			setIsPending(false);
			timer = null;

			callback(...args);
		}, interval);
	};

	if (component) {
		onMount(() => {
			if (immediate) {
				start();
			}

			return () => {
				if (cancelOnUnmount) {
					clear();
				}
			};
		});
	} else if (immediate) {
		start();
	}

	return {
		isPending,
		stop,
		start,
	};
}
