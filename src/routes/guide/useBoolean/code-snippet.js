export const sourceCode = `
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

`;
export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useBoolean } from "@dimaslz/svelteuse";

	const { value, setValue, setTrue, setFalse, toggle } = useBoolean();

	const customToggle = () => {
		setValue(!get(value));
	};
</script>

<!-- html -->
<div>
	<p>
		Value <code>{$value}</code>
	</p>

	<div>
		<button on:click={setTrue}>set true</button>
		<button on:click={setFalse}>set false</button>
		<button on:click={toggle}>toggle value</button>
		<button on:click={customToggle}>custom toggle</button>
	</div>
</div>
`;
