export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useToggle } from "@dimaslz/svelteuse";

	const [value, toggle, setValue] = useToggle();

	const customToggle = () => {
		setValue(!get(value));
	};
</script>

<!-- html -->
<div>
	<div>
		<p>
			Value <code>{$value}</code>
		</p>
	</div>

	<div>
		<button on:click={toggle}>toggle value</button>
		<button on:click={customToggle}>custom toggle</button>
	</div>
</div>
`;

export const sourceCode = `
import { useState } from "@dimaslz/svelteuse"

export function useToggle(defaultValue?: boolean): {
	value: SvelteStore<boolean>;
	toggle: () => void;
	update: (b: boolean) => void;
} {
	const [value, update] = useState(!!defaultValue);

	const toggle = () => update((x) => !x);

	return { value, toggle, update };
}
`;
