export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useHover } from "@dimaslz/svelteuse";

	let hoverRef: HTMLElement;
	const [isHover, setElement] = useHover();

	onMount(() => {
		setElement(hoverRef);
	});
</script>

<!-- html -->
<div>
	<p>
		isHover? <code>{$isHover}</code>
	</p>

	<div
		class={[
			"w-full h-24 flex items-center justify-center",
			$isHover ? "bg-gray-900" : "bg-gray-800",
		].join(" ")}
		bind:this={hoverRef}
	>
		<div class="text-gray-600">hover your mouse here</div>
	</div>
</div>
`;

export const sourceCode = `
import { useEventListener, useState } from "@dimaslz/svelteuse"

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
`;
