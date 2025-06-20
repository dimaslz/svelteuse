import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { useLongPress } from './useLongPress';

describe('useLongPress', () => {
  let node: HTMLDivElement;

  beforeEach(() => {
    vi.useFakeTimers();
    node = document.createElement('div');
    document.body.appendChild(node);
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    node.remove();
  });

  it('should call the callback after threshold', () => {
    const callback = vi.fn();
    const { destroy } = useLongPress(node, callback, { threshold: 500 });

    node.dispatchEvent(new MouseEvent('mousedown'));
    vi.advanceTimersByTime(500);
    node.dispatchEvent(new MouseEvent('mouseup'));

    expect(callback).toHaveBeenCalledTimes(1);
    destroy();
  });

  it('should call onStart immediately', () => {
    const onStart = vi.fn();
		const { destroy } = useLongPress(
			node,
			() => {},
			{ onStart }
		);

    node.dispatchEvent(new MouseEvent('mousedown'));
    expect(onStart).toHaveBeenCalledTimes(1);

    destroy();
  });

  it('should call onFinish only if long press completed', () => {
    const onFinish = vi.fn();
		const { destroy } = useLongPress(
			node,
			() => {},
			{ threshold: 400, onFinish }
		);

    node.dispatchEvent(new MouseEvent('mousedown'));
    vi.advanceTimersByTime(400);
    node.dispatchEvent(new MouseEvent('mouseup'));

    expect(onFinish).toHaveBeenCalledTimes(1);
    destroy();
  });

  it('should call onCancel if press was too short', () => {
    const onCancel = vi.fn();
		const { destroy } = useLongPress(
			node,
			() => {},
			{ threshold: 500, onCancel }
		);

    node.dispatchEvent(new MouseEvent('mousedown'));
    vi.advanceTimersByTime(300); // not long enough
    node.dispatchEvent(new MouseEvent('mouseup'));

    expect(onCancel).toHaveBeenCalledTimes(1);
    destroy();
  });

  it('should support touch events', () => {
    const callback = vi.fn();
    const { destroy } = useLongPress(node, callback, { threshold: 200 });

    node.dispatchEvent(new TouchEvent('touchstart'));
    vi.advanceTimersByTime(200);
    node.dispatchEvent(new TouchEvent('touchend'));

    expect(callback).toHaveBeenCalledTimes(1);
    destroy();
  });
});