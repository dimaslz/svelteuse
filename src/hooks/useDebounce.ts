import { useState } from "@/hooks";

export function useDebounce<T>(value: T, delay?: number): any {
	const [state, setValue] = useState<T>(value);

	let timeout: NodeJS.Timeout;

	function setDebouncedValue(newValue: T) {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			setValue(newValue);
		}, delay);
	}

	return [state, setDebouncedValue];
}
