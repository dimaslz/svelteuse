export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useCountdown } from "@dimaslz/svelteuse";

	const [count, { start, stop, reset }] = useCountdown({
		countStart: 10,
		countStop: 5,
		intervalMs: 1000,
		isIncrement: false
	});
</script>

<!-- html -->
<div>
	<h1>{$count}</h1>
	<button on:click={start}>Start</button>
	<button on:click={stop}>Stop</button>
	<button on:click={reset}>Reset</button>
</div>
`;

export const sourceCode = `
import { get } from 'svelte/store';

import { useCounter, useBoolean, useIntervalFn } from '@/hooks';

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
	const {
		value: isCountdownRunning,
		setTrue: start,
		setFalse: stop
	} = useBoolean(false);

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

	const { pause, resume } = useIntervalFn(countdownCallback, isCountdownRunning ? intervalMs : null);

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
};
`;
