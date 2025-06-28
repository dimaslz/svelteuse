import { describe, it, expect } from 'vitest';
import { get } from 'svelte/store';
import { useStep } from './useStep';

describe('Hooks - useStep', () => {
	it('initializes at step 1', () => {
		const [step] = useStep(5);

		expect(get(step)).toBe(1);
	});

	it('goes to next step', () => {
		const [step, { goToNextStep }] = useStep(5);

		goToNextStep();

		expect(get(step)).toBe(2);
	});

	it('goes to previous step', () => {
		const [step, { goToNextStep, goToPrevStep }] = useStep(5);

		goToNextStep();
		goToNextStep();
		goToPrevStep();

		expect(get(step)).toBe(2);
	});

	it('resets to step 1', () => {
		const [step, { goToNextStep, reset }] = useStep(5);

		goToNextStep();
		reset();

		expect(get(step)).toBe(1);
	});

	it('sets step directly with value', () => {
		const [step, { setStep }] = useStep(5);

		setStep(3);

		expect(get(step)).toBe(3);
	});

	it('sets step using callback function', () => {
		const [step, { setStep }] = useStep(5);

		setStep(() => 4);

		expect(get(step)).toBe(4);
	});

	it('throws error if step is out of bounds', () => {
		const [_, { setStep }] = useStep(3);

		expect(() => setStep(10)).toThrow('Step not valid');
		expect(() => setStep(0)).toThrow('Step not valid');
	});

	it('prevents going beyond maxStep', () => {
		const [step, { goToNextStep }] = useStep(2);

		goToNextStep();
		goToNextStep();

		expect(get(step)).toBe(2);
	});

	it('prevents going below 1', () => {
		const [step, { goToPrevStep }] = useStep(5);

		goToPrevStep();

		expect(get(step)).toBe(1);
	});
});