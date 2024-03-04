export type FunctionArgs<Args extends any[] = any[], Return = void> = (...args: Args) => Return;

export function useThrottleFn<T extends FunctionArgs>(fn: T, interval: number = 1000): T {
	let lastUpdated: number = 0;
	let id: number;

	return (...args) => {
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
