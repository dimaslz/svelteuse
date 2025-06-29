export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useStepper } from '@dimaslz/svelteuse';

	const steps = ['Account', 'Details', 'Confirm'];
	const {
		current,
		goToNext,
		goToPrevious,
		isFirst,
		isLast,
	} = useStepper(steps);
</script>

<!-- html -->
<h2>Step: {$current}</h2>

{#if $current === 'Account'}
	<p>Account setup step</p>
{:else if $current === 'Details'}
	<p>Enter personal details</p>
{:else}
	<p>Confirm and submit</p>
{/if}

<div style="margin-top: 1rem;">
	<button on:click={goToPrevious} disabled={$isFirst}>Back</button>
	<button on:click={goToNext} disabled={$isLast}>Next</button>
</div>
`;

export const sourceCode = `
import { derived, get, writable, type Writable, type Readable } from 'svelte/store';

type UseStepperReturn<StepName, Steps, Step> = {
  steps: Readable<Steps>;
  stepNames: Readable<StepName[]>;
  index: Writable<number>;
  current: Readable<Step>;
  next: Readable<StepName | undefined>;
  previous: Readable<StepName | undefined>;
  isFirst: Readable<boolean>;
  isLast: Readable<boolean>;
  at: (index: number) => Step | undefined;
  get: (step: StepName) => Step | undefined;
  goTo: (step: StepName) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  goBackTo: (step: StepName) => void;
  isNext: (step: StepName) => boolean;
  isPrevious: (step: StepName) => boolean;
  isCurrent: (step: StepName) => boolean;
  isBefore: (step: StepName) => boolean;
  isAfter: (step: StepName) => boolean;
};

export function useStepper<T extends string | number | symbol, V extends Record<T, any> | T[]>(
  stepsInput: V,
  initialStep?: T
): UseStepperReturn<T, V, V extends T[] ? T : V[keyof V]> {
  const isArray = Array.isArray(stepsInput);
  const stepNames = isArray ? (stepsInput as T[]) : (Object.keys(stepsInput) as T[]);
  const steps = writable(stepsInput);
  const index = writable(stepNames.indexOf(initialStep ?? stepNames[0]));

  function at(idx: number) {
    const val = get(steps);
    return isArray ? (val as T[])[idx] : (val as Record<T, any>)[stepNames[idx]];
  }

  function getStep(step: T) {
    const idx = stepNames.indexOf(step);
    if (idx === -1) return undefined;
    return at(idx);
  }

  function goTo(step: T) {
    const idx = stepNames.indexOf(step);
    if (idx !== -1) index.set(idx);
  }

  function goToNext() {
    const i = get(index);
    if (i < stepNames.length - 1) index.set(i + 1);
  }

  function goToPrevious() {
    const i = get(index);
    if (i > 0) index.set(i - 1);
  }

  function goBackTo(step: T) {
    const idx = stepNames.indexOf(step);
    if (get(index) > idx) goTo(step);
  }

  function isNext(step: T) {
    return stepNames.indexOf(step) === get(index) + 1;
  }

  function isPrevious(step: T) {
    return stepNames.indexOf(step) === get(index) - 1;
  }

  function isCurrent(step: T) {
    return stepNames.indexOf(step) === get(index);
  }

  function isBefore(step: T) {
    return get(index) < stepNames.indexOf(step);
  }

  function isAfter(step: T) {
    return get(index) > stepNames.indexOf(step);
  }

  return {
    steps,
    stepNames: writable(stepNames),
    index,
    current: derived(index, $i => at($i)),
    next: derived(index, $i => stepNames[$i + 1]),
    previous: derived(index, $i => stepNames[$i - 1]),
    isFirst: derived(index, $i => $i === 0),
    isLast: derived(index, $i => $i === stepNames.length - 1),
    at,
    get: getStep,
    goTo,
    goToNext,
    goToPrevious,
    goBackTo,
    isNext,
    isPrevious,
    isCurrent,
    isBefore,
    isAfter,
  };
}
`;
