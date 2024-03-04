export function useDebounceFn<Args extends unknown[], T = string>(
	fn: (...args: Args) => T,
	delay: number = 1000,
) {
	let timeout: number;

	function setDebouncedValue(...args: Args): void {
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			fn(...args);
		}, delay);
	}

	return setDebouncedValue;
}
