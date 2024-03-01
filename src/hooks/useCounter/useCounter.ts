import { type TsetValue, useState } from "../useState/useState";

interface UseCounterOutput {
	count: Readonly<SvelteStore<number>>;
	increment: (n?: number) => void;
	decrement: (n?: number) => void;
	reset: () => void;
	setCount: TsetValue<number>;
}

export function useCounter(initialValue?: number): UseCounterOutput {
	const [count, setCount] = useState<number>(initialValue || 0);

	const increment = (n: number = 1) => setCount((x) => x + n);
	const decrement = (n: number = 1) => setCount((x) => x - n);
	const reset = () => setCount(initialValue || 0);

	return {
		count,
		increment,
		decrement,
		reset,
		setCount,
	};
}
