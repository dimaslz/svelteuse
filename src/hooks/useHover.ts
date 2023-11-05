import { useEventListener, useState } from ".";

export function useHover<T extends HTMLElement = HTMLElement>(): [
	SvelteStore<boolean>,
	(v: T) => void,
] {
	const [value, setValue] = useState<boolean>(false);

	const handleMouseEnter = () => setValue(true);
	const handleMouseLeave = () => setValue(false);

	const setElementRef = (elementRef: T) => {
		useEventListener("mouseenter", handleMouseEnter, elementRef);
		useEventListener("mouseleave", handleMouseLeave, elementRef);
	};

	return [value, setElementRef];
}
