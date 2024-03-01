import { useEventListener, useState } from "..";

export function useHover<T extends HTMLElement = HTMLElement>({
	onEnter = () => {},
	onLeave = () => {},
}: {
	onEnter?: (() => void) | null;
	onLeave?: (() => void) | null;
} = {}): [SvelteStore<boolean>, (v: T) => void] {
	const [value, setValue] = useState<boolean>(false);

	const handleMouseEnter = () => {
		if (onEnter) onEnter();
		setValue(true);
	};
	const handleMouseLeave = () => {
		if (onLeave) onLeave();
		setValue(false);
	};

	const setElementRef = (elementRef: T) => {
		useEventListener("mouseenter", handleMouseEnter, elementRef);
		useEventListener("mouseleave", handleMouseLeave, elementRef);
	};

	return [value, setElementRef];
}
