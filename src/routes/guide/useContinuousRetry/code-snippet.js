export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useContinuousRetry } from "@dimaslz/svelteuse";

	let attemptCount = 0;

	const hasResolved = useContinuousRetry(() => {
		attemptCount += 1;
		return attemptCount >= 5; // will resolve on 5th attempt
	}, 200);
</script>

<!-- html -->
<div>
	<p>Resolved? {$hasResolved ? 'Yes' : 'No'}</p>
</div>
`;

export const sourceCode = `
import { isClient } from '@/utils/is-client';
import { readable } from 'svelte/store';

interface RetryOptions {
	maxRetries?: number;
	immediate?: boolean;
}

export function useContinuousRetry(
	callback: () => boolean,
	interval = 100,
	options: RetryOptions = {}
) {
	const { immediate = true, maxRetries = Infinity } = options;

	return readable<boolean>(false, (set) => {
		if (!isClient()) return;

		let retries = 0;
		if (immediate) {
			retries += 1;

			if (callback()) {
				set(true);
				return;
			}
		}

		const id = setInterval(() => {
			if (callback()) {
				set(true);
				clearInterval(id);
			} else if (retries >= maxRetries) {
				clearInterval(id);
			} else {
				retries += 1;
			}
		}, interval);

		return () => {
			clearInterval(id);
		};
	});
}
`;
