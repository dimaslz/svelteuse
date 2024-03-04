import { useState } from "@/hooks";

type Fn<T> = () => T;
type NewValue<T> = Fn<T> | T;

type Return<T> = (f: Fn<T> | T) => void;

export function useThrottle<T = string>(
	_value: NewValue<T>,
	interval: number = 1000,
): [SvelteStore<T>, Return<T>] {
	const [value, updateValue] = useState<T>((_value || "") as T);

	let lastUpdated: number = 0;
	let id: number;

	const setThrottleValue = (newValue: NewValue<T>) => {
		const now = Date.now();
		if (now - lastUpdated < interval) {
			if (id) {
				clearTimeout(id);
			}

			id = setTimeout(() => {
				clearTimeout(id);
				updateValue(typeof newValue === "function" ? (newValue as () => T)() : (newValue as T));
			}, interval);

			return;
		}

		lastUpdated = now;
		return updateValue(typeof newValue === "function" ? (newValue as () => T)() : (newValue as T));
	};

	return [value, setThrottleValue];
}
