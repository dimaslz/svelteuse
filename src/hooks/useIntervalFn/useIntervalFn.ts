export function useIntervalFn(callback: () => void, delay: number | null): () => void {
	let savedCallback = callback;

	savedCallback = callback;

	if (!delay) {
		throw new Error("Delay time are mandatory and should be from 1ms");
	}

	const id = setInterval(() => {
		savedCallback();
	}, delay);

	return (): void => {
		clearInterval(id);
	};
}
