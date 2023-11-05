export default `
<script lang="ts">
	import { onMount } from "svelte";
	import { useEventListener } from "@dimaslz/svelteuse";

	let ref: HTMLButtonElement;

	let clickOnWindow: boolean = false;
	let clickOnButton: boolean = false;
	let setTimeoutInstance: number;

	const onClickWindowHandler = () => {
		console.log("on click window");
		clickOnWindow = true;
		clickOnButton = false;
	};
	const onClickWindow = useEventListener("click", onClickWindowHandler);

	const onClickButtonHandler = () => {
		console.log("on click button");

		if (setTimeoutInstance) {
			clearTimeout(setTimeoutInstance);
		}

		setTimeout(() => (clickOnButton = true));
	};

	onMount(() => {
		const clickButtonHandler = useEventListener("click", onClickButtonHandler, ref);

		return () => {
			clickButtonHandler?.();
			onClickWindow?.();
			console.clear();
		};
	});
</script>

// ...

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
