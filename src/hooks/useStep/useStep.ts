import { get, type Writable, writable } from "svelte/store";

type UseStepActions = {
	goToNextStep: () => void;
	goToPrevStep: () => void;
	reset: () => void;
	canGoToNextStep: Writable<boolean>;
	canGoToPrevStep: Writable<boolean>;
	setStep: (step: number | ((step: number) => number)) => void;
};

export function useStep(maxStep: number): [step: Writable<number>, actions: UseStepActions] {
	const stepStore = writable(1);
	const canGoToPrevStep = writable(false);
	const canGoToNextStep = writable(false);

	stepStore.subscribe((value) => {
		canGoToPrevStep.set(value - 1 > 0);
		canGoToNextStep.set(value < maxStep);
	});

	function setStep(step: number | ((current: number) => number)) {
		const current = get(stepStore);
		const newStep = typeof step === "function" ? step(current) : step;

		if (newStep >= 1 && newStep <= maxStep) {
			stepStore.set(newStep);
		} else {
			throw new Error("Step not valid");
		}
	}

	function goToNextStep() {
		if (get(canGoToNextStep)) {
			stepStore.set(get(stepStore) + 1);
		}
	}

	function goToPrevStep() {
		if (get(canGoToPrevStep)) {
			stepStore.set(get(stepStore) - 1);
		}
	}

	function reset() {
		stepStore.set(1);
	}

	const actions: UseStepActions = {
		goToNextStep,
		goToPrevStep,
		reset,
		setStep,
		canGoToNextStep,
		canGoToPrevStep,
	};

	return [stepStore, actions];
}
