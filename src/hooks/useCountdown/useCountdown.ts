import { get } from "svelte/store";

import { useBoolean, useCounter, useIntervalFn } from "@/hooks";

type CountdownOptions = {
	countStart: number;
	intervalMs?: number;
	isIncrement?: boolean;
	countStop?: number;
};

export function useCountdown({
	countStart,
	countStop = 0,
	intervalMs = 1000,
	isIncrement = false,
}: CountdownOptions) {
	const { count, increment, decrement, reset: resetCounter } = useCounter(countStart);
	const { value: isCountdownRunning, setTrue: start, setFalse: stop } = useBoolean(false);

	function reset() {
		stop();
		resetCounter();
	}

	function countdownCallback() {
		const currentCount = get(count);
		const stopAt = countStop;

		if (currentCount === stopAt) {
			stop();
			return;
		}

		if (isIncrement) {
			increment();
		} else {
			decrement();
		}
	}

	const { pause, resume } = useIntervalFn(
		countdownCallback,
		isCountdownRunning ? intervalMs : null,
	);

	return [
		count,
		{
			start: () => {
				start();
				resume();
			},
			stop: pause,
			reset,
		},
	] as const;
}
