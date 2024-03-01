import { type TsetValue, useState } from "@/hooks";

export type UseBooleanOutput = {
	value: SvelteStore<boolean>;
	setValue: TsetValue<boolean>;
	setTrue: () => void;
	setFalse: () => void;
	toggle: () => void;
};

export function useBoolean(defaultValue: boolean = false): UseBooleanOutput {
	const [value, setValue] = useState<boolean>(!!defaultValue);

	const setTrue = () => setValue(true);
	const setFalse = () => setValue(false);
	const toggle = () => setValue((x) => !x);

	return {
		value,
		setValue,
		setTrue,
		setFalse,
		toggle,
	};
}
