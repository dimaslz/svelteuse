import { describe, it, expect } from 'vitest';
import { get } from 'svelte/store';
import { useStepper } from './useStepper';

describe('Hook - useStepper', () => {
	it('initializes correctly with array', () => {
		const { current, index, isFirst, isLast } = useStepper(['a', 'b', 'c']);
		expect(get(current)).toBe('a');
		expect(get(index)).toBe(0);
		expect(get(isFirst)).toBe(true);
		expect(get(isLast)).toBe(false);
	});

	it('navigates next and previous', () => {
		const { current, goToNext, goToPrevious } = useStepper(['a', 'b', 'c']);

		goToNext();
		expect(get(current)).toBe('b');

		goToPrevious();
		expect(get(current)).toBe('a');
	});

	it('handles object-based steps', () => {
		const steps = {
			step1: { label: 'First' },
			step2: { label: 'Second' },
			step3: { label: 'Third' },
		};
		const { current, goTo, isLast } = useStepper<
			string,
			{ [k: string]: { label: string; } }
			>(steps, 'step2');

		expect(get(current)).toEqual({ label: 'Second' });

		goTo('step3');
		expect(get(isLast)).toBe(true);
	});

	it('supports goBackTo and index comparison', () => {
		const { goTo, goBackTo, isAfter, isBefore, current } = useStepper(['a', 'b', 'c']);

		goTo('c');
		expect(get(current)).toBe('c');
		expect(isAfter('a')).toBe(true);
		expect(isBefore('a')).toBe(false);

		goBackTo('a');
		expect(get(current)).toBe('a');
	});

	it('ignores invalid goTo values', () => {
		const { current, goTo } = useStepper(['a', 'b']);

		goTo('x' as any);
		expect(get(current)).toBe('a');
	});
});