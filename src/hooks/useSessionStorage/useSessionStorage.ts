import { get } from "svelte/store";

import { useEventListener } from "@/hooks/useEventListener/useEventListener";
import { type TsetValue, useState } from "@/hooks/useState/useState";
import { parseJSON } from "@/utils";

declare global {
	interface WindowEventMap {
		"session-storage": CustomEvent;
	}
}

type TFn<T> = (f: T) => T;
type TNewState<T> = TFn<T> | T;
type UseStateOutput<T> = {
	store: SvelteStore<T>;
	update: TsetValue<T>;
	reset: () => void;
	clear: () => void;
};

export function useSessionStorage<T>(key: string, initialValue: T): UseStateOutput<T> {
	const readValue = (): T => {
		// Prevent build error "window is undefined" but keeps working
		if (typeof window === "undefined") {
			return initialValue;
		}

		try {
			const item = window.sessionStorage.getItem(key);
			window.sessionStorage.setItem(
				key,
				JSON.stringify(item ? (parseJSON(item || "false") as T) : initialValue),
			);
			return item ? (parseJSON(item || "false") as T) : initialValue;
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

	const reset = () => {
		setValue(initialValue as T);
	};

	const clear = () => {
		window.sessionStorage.removeItem(key);
	};

	const handleStorageChange = (event: StorageEvent | CustomEvent) => {
		if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
			return;
		}

		setStoredValue(readValue());
	};

	useEventListener<StorageEvent | CustomEvent>("storage", handleStorageChange);

	useEventListener<StorageEvent | CustomEvent>("session-storage", handleStorageChange);

	return { store: storedValue, update: setValue, reset, clear };
}
