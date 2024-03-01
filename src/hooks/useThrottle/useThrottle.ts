import { useState } from "@/hooks/useState/useState";

export function useThrottle<T = null>(
	_value: T,
	interval = 1000,
): [SvelteStore<T>, (v: T) => void] {
	const [value, updateValue] = useState<T>((_value || "") as T);

	let lastUpdated: number = 0;
	let id: number;

	const run = (value: T) => {
		const now = Date.now();
		if (now - lastUpdated < interval) {
			if (id) {
				clearTimeout(id);
			}

			id = setTimeout(() => {
				clearTimeout(id);
				updateValue(value);
			}, interval);

			return;
		}
		lastUpdated = now;
		return updateValue(value);
	};

	return [value, run];
}
