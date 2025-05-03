import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

import { useIntervalFn } from "@/hooks";

export function useNow(): Writable<Date> {
	const now = writable(new Date());

	const update = () => { now.set(new Date()) }

	useIntervalFn(update, 1000, { immediate: true });

	return now;
}