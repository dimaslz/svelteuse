<script lang="ts">
	import { onMount } from "svelte";

	import { Browser, Button, DocTpl, H2, Highlight } from "@/components";
	import { useEventListener } from "@/hooks";

	import code from "./code-snippet";

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

<DocTpl title="useEventListener">
	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser>
			<div class="space-y-4">
				<div class="p-4 bg-gray-950/50">
					<p>
						<span class="font-bold">click on window:</span> <code>{clickOnWindow}</code>
					</p>
					<p>
						<span class="font-bold">click on button:</span> <code>{clickOnButton}</code>
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
