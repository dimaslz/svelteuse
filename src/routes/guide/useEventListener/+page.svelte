<script lang="ts">
	import { onMount } from "svelte";

	import { Browser, Button, DocTpl, H2, Highlight } from "@/components";
	import { useEventListener } from "@/hooks";

	import code from "./code-snippet";

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

<DocTpl title="useEventListener">
	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser>
			<div class="space-y-4">
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
		</Browser>
	</div>

	<div slot="code-example">
		<H2>Code example</H2>

		<Highlight {code} />
	</div>
</DocTpl>

<!-- <div class="w-full">
	<h1 class="text-4xl">useEventListener</h1>

	<div class="mt-4 space-y-4">
		<div class="p-4 bg-gray-950/50">
			<p>
				click on window: <code>{clickOnWindow}</code>
			</p>
			<p>
				click on button: <code>{clickOnButton}</code>
			</p>
		</div>

		<div>
			<Button bind:ref>click here</Button>
		</div>
	</div>
</div> -->
