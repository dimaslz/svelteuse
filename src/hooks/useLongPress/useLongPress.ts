type LongPressEvent = TouchEvent | MouseEvent;

type LongPressOptions = {
  threshold?: number;
  onStart?: (event: LongPressEvent) => void;
  onFinish?: (event: LongPressEvent) => void;
  onCancel?: (event: LongPressEvent) => void;
};

export function useLongPress(
	node: HTMLElement,
  callback: (event: LongPressEvent) => void,
  options: LongPressOptions = {}
) {
  const { threshold = 400, onStart, onFinish, onCancel } = options;

  let timerId: ReturnType<typeof setTimeout> | null = null;
  let isLongPress = false;
  let isPressed = false;

  function isTouch(event: any): event is TouchEvent {
    return typeof TouchEvent !== 'undefined'
      ? event instanceof TouchEvent
      : 'touches' in event;
  }

  function isMouse(event: any): event is MouseEvent {
    return typeof MouseEvent !== 'undefined'
      ? event instanceof MouseEvent
      : 'button' in event;
  }

  function start(event: LongPressEvent) {
    if (!isTouch(event) && !isMouse(event)) return;

    onStart?.(event);
    isPressed = true;

    timerId = setTimeout(() => {
      callback(event);
      isLongPress = true;
    }, threshold);
  }

  function cancel(event: LongPressEvent) {
    if (!isTouch(event) && !isMouse(event)) return;

    if (isLongPress) {
      onFinish?.(event);
    } else if (isPressed) {
      onCancel?.(event);
    }

    isLongPress = false;
    isPressed = false;

    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
  }

	node.addEventListener('mousedown', start);
	node.addEventListener('mouseup', cancel);
	node.addEventListener('mouseleave', cancel);
	node.addEventListener('touchstart', start);
	node.addEventListener('touchend', cancel);

	return {
		destroy() {
			node.removeEventListener('mousedown', start);
			node.removeEventListener('mouseup', cancel);
			node.removeEventListener('mouseleave', cancel);
			node.removeEventListener('touchstart', start);
			node.removeEventListener('touchend', cancel);
		}
	};
}