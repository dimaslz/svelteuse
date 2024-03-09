export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useIntervalFn, useState } from "@dimaslz/svelteuse";

	const [counter, updateCounter] = useState<number>(0);
	const { isActive, pause, resume } = useIntervalFn(() => {
		// here excecute the code as you need
		updateCounter((prevValue) => prevValue + 1);
	}, 200);
</script>

<!-- html -->
<div>
	<p>
		Update number every 200ms is <code>{$counter}</code>
	</p>
	<p>
		is active: {$isActive}
	</p>

	<div>
		<button on:click={pause}>pause</button>
		<button on:click={resume}>resume</button>
	</div>
</div>
`;

export const sourceCode = `
import { BROWSER } from "esm-env";

import { useState } from "@dimaslz/svelteuse"

type Options = {
	immediate?: boolean;
	immediateCallback?: boolean;
};

export type ReturnControls = {
	isActive: SvelteStore<boolean>;
	pause: () => void;
	resume: () => void;
};

export function useIntervalFn(
	callback: () => void,
	interval: number = 1000,
	options: Options = {},
): ReturnControls {
	const { immediate = true, immediateCallback = false } = options;

	let timer: ReturnType<typeof setInterval> | null = null;
	const [isActive, setIsActive] = useState(false);

	function clean() {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
	}

	function pause() {
		setIsActive(false);
		clean();
	}

	function resume() {
		const intervalValue = interval;
		if (intervalValue <= 0) {
			return;
		}

		setIsActive(true);

		if (immediateCallback) {
			callback();
		}

		clean();

		timer = setInterval(callback, intervalValue);
	}

	if (immediate && BROWSER) {
		resume();
	}

	return {
		isActive,
		pause,
		resume,
	};
}
`;
