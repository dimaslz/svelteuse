export function useThrottleFn<Args extends unknown[]>(
	fn: (...args: Args) => void,
	interval = 1000,
): (...args: Args) => void {
	let lastUpdated: number = 0;
	let id: number;

	return (...args: Args) => {
		const now = Date.now();
		if (now - lastUpdated < interval) {
			if (id) {
				clearTimeout(id);
			}

			id = setTimeout(() => {
				clearTimeout(id);
				fn(...args);
			}, interval);

			return;
		}

		lastUpdated = now;
		return fn(...args);
	};
}
