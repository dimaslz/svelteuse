export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useStep } from '@dimaslz/svelteuse';
	const [step, { goToNextStep, goToPrevStep, canGoToNextStep, canGoToPrevStep }] = useStep(3);
</script>


<!-- html -->
<h2>Step {$step} of 3</h2>

{#if $step === 1}
	<p>Step 1 content</p>
{:else if $step === 2}
	<p>Step 2 content</p>
{:else}
	<p>Final Step</p>
{/if}

<div style="margin-top: 1rem;">
	<button on:click={goToPrevStep} disabled={!$canGoToPrevStep}>Previous</button>
	<button on:click={goToNextStep} disabled={!$canGoToNextStep}>Next</button>
</div>
`;

export const sourceCode = `
import { writable, get } from 'svelte/store';

type UseStepActions = {
	goToNextStep: () => void;
	goToPrevStep: () => void;
	reset: () => void;
	canGoToNextStep: boolean;
	canGoToPrevStep: boolean;
	setStep: (step: number | ((step: number) => number)) => void;
};

export function useStep(maxStep: number): [step: typeof stepStore, actions: UseStepActions] {
	const stepStore = writable(1);

	function setStep(step: number | ((current: number) => number)) {
		const current = get(stepStore);
		const newStep = typeof step === 'function' ? step(current) : step;

		if (newStep >= 1 && newStep <= maxStep) {
			stepStore.set(newStep);
		} else {
			throw new Error('Step not valid');
		}
	}

	function goToNextStep() {
		const current = get(stepStore);
		if (current < maxStep) stepStore.set(current + 1);
	}

	function goToPrevStep() {
		const current = get(stepStore);
		if (current > 1) stepStore.set(current - 1);
	}

	function reset() {
		stepStore.set(1);
	}

	const actions: UseStepActions = {
		goToNextStep,
		goToPrevStep,
		reset,
		setStep,
		get canGoToNextStep() {
			return get(stepStore) + 1 <= maxStep;
		},
		get canGoToPrevStep() {
			return get(stepStore) - 1 >= 1;
		}
	};

	return [stepStore, actions];
}
`;
