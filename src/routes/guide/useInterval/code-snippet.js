export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useIntervalFn, useState } from "@dimaslz/svelteuse";

	const counter = useInterval(200);
	const { isActive, state: counter2, reset, pause, resume } = useInterval(200, { controls: true });
</script>

<!-- html -->
<div>
	<p>
		Update number every 200ms without controls: <code>{$counter}</code>
	</p>

	<div>
		<p>
			Update number every 200ms with controls: <code>{$counter2}</code>
		</p>

		<p>
			is active: {$isActive}
		</p>

		<div>
			<Button on:click={pause}>pause</Button>
			<Button on:click={resume}>resume</Button>
			<Button on:click={reset}>reset</Button>
		</div>
	</div>
</div>
`;

export const sourceCode = `
import { get } from "svelte/store";

import { type ReturnControls as IntervalFnReturnControls, useIntervalFn, useState } from "@dimaslz/svelteuse"

type IntervalOptions = {
	controls?: boolean;
	immediate?: boolean;
	callback?: (count: number) => void;
};

type ReturnControls = {
	state: SvelteStore<number>;
	reset: () => void;
} & IntervalFnReturnControls;
// type IntervalReturn = ReturnControls | SvelteStore<number>;

export function useInterval(interval: number): SvelteStore<number>;
export function useInterval(interval: number, options?: IntervalOptions): ReturnControls;
export function useInterval(interval: number, options: IntervalOptions = {}): unknown {
	const { controls: exposeControls = false, immediate = true, callback } = options;

	const [state, updateState] = useState<number>(0);

	const update = () => {
		updateState((c) => {
			return c + 1;
		});
	};
	const reset = () => {
		updateState(0);
	};

	const controls = useIntervalFn(
		callback
			? () => {
					update();
					callback(get(state));
				}
			: update,
		interval,
		{ immediate },
	);

	if (exposeControls) {
		return {
			state,
			reset,
			...controls,
		};
	}

	return state;
}
`;
