import { type TsetValue, useState } from "../useState/useState";

interface UseCounterOutput {
	count: Readonly<SvelteStore<number>>;
	increment: (e?: MouseEvent | number) => void;
	decrement: (e?: MouseEvent | number) => void;
	reset: () => void;
	setCount: TsetValue<number>;
}

export function useCounter(initialValue?: number): UseCounterOutput {
	const [count, setCount] = useState<number>(initialValue || 0);

	const increment = (n: number | MouseEvent = 1) => {
		if (n instanceof MouseEvent) {
			setCount((x) => x + 1);
		} else {
			setCount((x) => x + n);
		}
	};

	const decrement = (n: number | MouseEvent = 1) => {
		if (n instanceof MouseEvent) {
			setCount((x) => x - 1);
		} else {
			setCount((x) => x - n);
		}
	};

	const reset = () => {
		setCount(initialValue || 0);
	};

	return {
		count,
		increment,
		decrement,
		reset,
		setCount,
	};
}
