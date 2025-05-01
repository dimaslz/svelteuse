import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';

import MouseTrackerWrapper from './MouseTrackerWrapper.svelte';

describe('Hooks - useMouseInElement (by MouseTrackerWrapper)', () => {
  it('should update mouse coordinates on move (isOutside = false)', async () => {
    const onUpdate = vi.fn();
    const { getByText, getByTestId } = render(MouseTrackerWrapper, { props: { onUpdate } });

		const div = getByTestId('track-area');
    const rect = { left: 50, top: 100, width: 100, height: 100 };

    vi.spyOn(div, 'getBoundingClientRect').mockReturnValue({
      ...rect,
      right: rect.left + rect.width,
      bottom: rect.top + rect.height,
      x: rect.left,
      y: rect.top,
      toJSON: () => rect
    });

    await fireEvent.mouseMove(document, {
      // pageX: 50,
      // pageY: 125,
      clientX: 75,
      clientY: 125,
    });

    // Give it a tick to propagate reactivity
		// await new Promise(resolve => setTimeout(resolve));

		expect(getByText(/Mouse Position: 75, 125/i))

		const lastCall = onUpdate.mock.calls.at(-1)?.[0];

    expect(lastCall?.x).toBe(75);
		expect(lastCall?.y).toBe(125);
    expect(lastCall?.elementX).toBe(25);
    expect(lastCall?.elementY).toBe(25);
    expect(lastCall?.elementPositionX).toBe(50);
		expect(lastCall?.elementPositionY).toBe(100);
		expect(lastCall?.elementWidth).toBe(100);
		expect(lastCall?.elementHeight).toBe(100);
		expect(lastCall?.isOutside).toBe(false);
	});

  it('should update mouse coordinates on move (isOutside = true)', async () => {
    const onUpdate = vi.fn();
    const { getByText, getByTestId } = render(MouseTrackerWrapper, { props: { onUpdate } });

		const div = getByTestId('track-area');
    const rect = { left: 50, top: 100, width: 100, height: 100 };

    vi.spyOn(div, 'getBoundingClientRect').mockReturnValue({
      ...rect,
      right: rect.left + rect.width,
      bottom: rect.top + rect.height,
      x: rect.left,
      y: rect.top,
      toJSON: () => rect
    });

    await fireEvent.mouseMove(document, {
      clientX: 250,
      clientY: 250,
    });

    // Give it a tick to propagate reactivity
		// await new Promise(resolve => setTimeout(resolve));

		expect(getByText(/Mouse Position: 250, 250/i))

		const lastCall = onUpdate.mock.calls.at(-1)?.[0];

    expect(lastCall?.x).toBe(250);
		expect(lastCall?.y).toBe(250);
    expect(lastCall?.elementX).toBe(200);
    expect(lastCall?.elementY).toBe(150);
    expect(lastCall?.elementPositionX).toBe(50);
		expect(lastCall?.elementPositionY).toBe(100);
		expect(lastCall?.elementWidth).toBe(100);
		expect(lastCall?.elementHeight).toBe(100);
		expect(lastCall?.isOutside).toBe(true);
  });

  it('should clean up listener on destroy', async () => {
    const onUpdate = vi.fn();
    const { unmount } = render(MouseTrackerWrapper, { props: { onUpdate } });

    // simulate and check
    await fireEvent.mouseMove(document, { pageX: 100, pageY: 100 });
    await new Promise(resolve => setTimeout(resolve));
    expect(onUpdate).toHaveBeenCalled();

    onUpdate.mockClear();
    unmount();

    await fireEvent.mouseMove(document, { pageX: 200, pageY: 200 });
    await new Promise(resolve => setTimeout(resolve));
    expect(onUpdate).not.toHaveBeenCalled(); // No update after unmount
  });
});