import { get, writable } from "svelte/store";
export type TsetValue<T> = (v: T | TFn<T>) => void;

type TFn<T> = (f: T) => T;
type TNewState<T> = TFn<T> | T;
type UseStateOutput<T> = [SvelteStore<T>, TsetValue<T>];

export const useState = <T>(value: T | null = null): UseStateOutput<T> => {
	const { subscribe, update } = writable<T>(value as T);

	const setState = (newState: TNewState<T>): void => {
		if (newState instanceof Function) {
			update(() => newState(get({ subscribe })));
		} else {
			update(() => newState);
		}
	};

	return [{ subscribe }, setState];
};
