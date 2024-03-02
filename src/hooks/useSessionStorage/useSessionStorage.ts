import { onMount } from "svelte";
import { get } from "svelte/store";

import { useEventListener } from "@/hooks/useEventListener/useEventListener";
import { type TsetValue, useState } from "@/hooks/useState/useState";

// A wrapper for "JSON.parse()"" to support "undefined" value
function parseJSON<T>(value: string | null): T | undefined {
	try {
		return value === "undefined" ? undefined : JSON.parse(value ?? "");
	} catch {
		console.log("parsing error on", { value });
		return undefined;
	}
}

declare global {
	interface WindowEventMap {
		"session-storage": CustomEvent;
	}
}

type TFn<T> = (f: T) => T;
type TNewState<T> = TFn<T> | T;
type UseStateOutput<T> = [SvelteStore<T>, TsetValue<T>];

export function useSessionStorage<T>(key: string, initialValue: T): UseStateOutput<T> {
	const readValue = (): T => {
		// Prevent build error "window is undefined" but keeps working
		if (typeof window === "undefined") {
			return initialValue;
		}

		try {
			const item = window.sessionStorage.getItem(key);
			return item ? (parseJSON(item) as T) : initialValue;
		} catch (error) {
			console.warn(`Error reading sessionStorage key “${key}”:`, error);
			return initialValue;
		}
	};

	const [storedValue, setStoredValue] = useState<T>(readValue);

	const setValue = (value: TNewState<T>): void => {
		// Prevent build error "window is undefined" but keeps working
		if (typeof window === "undefined") {
			console.warn(
				`Tried setting sessionStorage key “${key}” even though environment is not a client`,
			);
		}

		try {
			const newValue = value instanceof Function ? value(get(storedValue)) : value;
			window.sessionStorage.setItem(key, JSON.stringify(newValue));

			window.dispatchEvent(new Event("session-storage"));
		} catch (error) {
			console.warn(`Error setting sessionStorage key “${key}”:`, error);
		}
	};

	onMount(() => {
		setStoredValue(readValue());
	});

	const handleStorageChange = (event: StorageEvent | CustomEvent) => {
		if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
			return;
		}

		setStoredValue(readValue());
	};

	useEventListener<StorageEvent | CustomEvent>("storage", handleStorageChange);

	useEventListener<StorageEvent | CustomEvent>("session-storage", handleStorageChange);

	return [storedValue, setValue];
}
