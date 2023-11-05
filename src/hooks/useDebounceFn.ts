type Fn<T> = (v: T) => void;

type Value<T> = ((v: T) => void) | (() => T);
type Return<T> = (() => void) | ((f?: Fn<T> | T) => void);

export function useDebounceFn<T>(value: Value<T>, delay?: number): Return<T> {
	let timeout: NodeJS.Timeout;

	function setDebouncedValue(newValue?: Value<T>): void {
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			if (typeof value === "function") {
				if (newValue) {
					(value as (f: Fn<T> | T) => void)(newValue);
				} else {
					(value as () => void)();
				}
			}
		}, delay);
	}

	return setDebouncedValue;
}
