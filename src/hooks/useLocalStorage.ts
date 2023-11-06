import { get } from "svelte/store";

import { useEventListener, useState } from "@/hooks";
import type { TsetValue } from "@/hooks/useState";

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
		"local-storage": CustomEvent;
	}
}

type TFn<T> = (f: T) => T;
type TNewState<T> = TFn<T> | T;
type UseStateOutput<T> = [SvelteStore<T>, TsetValue<T>, () => void, () => void];

export function useLocalStorage<T>(key: string, initialValue: T): UseStateOutput<T> {
	const readValue = (): T => {
		// Prevent build error "window is undefined" but keeps working
		if (typeof window === "undefined") {
			return initialValue;
		}

		try {
			const item = window.localStorage.getItem(key);
			return item ? (parseJSON(item || "false") as T) : initialValue;
		} catch (error) {
			console.warn(`Error reading localStorage key “${key}”:`, error);
			return initialValue;
		}
	};

	const [storedValue, setStoredValue] = useState<T>(readValue);

	const setValue = (value: TNewState<T>): void => {
		// Prevent build error "window is undefined" but keeps working
		if (typeof window === "undefined") {
			console.warn(
				`Tried setting localStorage key “${key}” even though environment is not a client`,
			);
		}

		try {
			const newValue = value instanceof Function ? value(get(storedValue)) : value;
			window.localStorage.setItem(key, JSON.stringify(newValue));

			window.dispatchEvent(new Event("local-storage"));
		} catch (error) {
			console.warn(`Error setting localStorage key “${key}”:`, error);
		}
	};

	const reset = () => {
		setValue("" as T);
	};

	const clear = () => {
		window.localStorage.removeItem(key);
	};

	const handleStorageChange = (event: StorageEvent | CustomEvent) => {
		if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
			return;
		}

		setStoredValue(readValue());
	};

	useEventListener<StorageEvent | CustomEvent>("storage", handleStorageChange);

	useEventListener<StorageEvent | CustomEvent>("local-storage", handleStorageChange);

	return [storedValue, setValue, reset, clear];
}
