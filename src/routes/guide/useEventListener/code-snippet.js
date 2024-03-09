export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { onMount } from "svelte";
	import { useEventListener } from "@dimaslz/svelteuse";

	let ref: HTMLButtonElement;

	let clickOnWindow: boolean = false;
	let clickOnButton: boolean = false;

	const onClickWindowHandler = () => {
		console.log("on click window");

		clickOnWindow = true;
		clickOnButton = false;
	};
	const onClickWindow = useEventListener("click", onClickWindowHandler);

	const onClickButtonHandler = () => {
		console.log("on click button");

		clickOnButton = true;
	};

	onMount(() => {
		const clickButtonHandler = useEventListener("click", onClickButtonHandler, ref);

		return () => {
			clickButtonHandler?.();
			onClickWindow?.();
		};
	});
</script>

<!-- html -->
<div>
	<div class="p-4 bg-gray-950/50">
		<p>
			click on window: <code>{clickOnWindow}</code>
		</p>
		<p>
			click on button: <code>{clickOnButton}</code>
		</p>

		<div>
			<Button bind:ref>click here</Button>
		</div>
	</div>
</div>
`;

export const sourceCode = `
import { BROWSER } from "esm-env";

const eventListeners = new Map();

export function useEventListener<E extends Event = Event>(
	eventName: string,
	handler: (event: E) => void,
	element: Element | Window | null = BROWSER ? window : null,
	options: boolean = true,
): () => void {
	if (!element) {
		return () => {};
	}

	const id = Math.random().toString(36).substr(2, 9);
	const listener = (event: E) => handler(event);

	eventListeners.set(id, {
		eventName,
		handler: listener,
		element,
		options,
	});

	element.addEventListener(eventName, listener as EventListener, options);

	return (): void => {
		element.removeEventListener(eventName, listener as EventListener, options);
		eventListeners.delete(id);
	};
}
`;
