<script lang="ts">
	import { onMount } from "svelte";

	import {
		ArrowLeftOutline,
		ArrowRightOutline,
		InfoOutlineIcon,
		ReloadOutline,
	} from "@/components/icons";
	import { useBoolean, useClickOutside } from "@/hooks";

	export let ref: HTMLDivElement | null = null;
	export let title: string = "site title";
	export let body: string = "";

	const { value: browserFocused, setFalse: unfocusBrowser, setTrue: focusBrowser } = useBoolean();

	onMount(() => {
		if (ref) {
			useClickOutside(ref, unfocusBrowser);
		}
	});
</script>

<div
	class={[
		"rounded-md relative cursor-default",
		$browserFocused ? "bg-[#212121]" : "bg-[#3F3F3F]",
	].join(" ")}
	{...$$restProps}
	bind:this={ref}
	role="button"
	tabindex="-1"
	on:click={focusBrowser}
	on:keydown={() => []}
>
	<div class="flex space-x-4 pt-2 px-4">
		<div class="flex space-x-2 rounded-md rounded-br-md">
			<div class="w-3 h-3 bg-gray-600 rounded-full"></div>
			<div class="w-3 h-3 bg-gray-600 rounded-full"></div>
			<div class="w-3 h-3 bg-gray-600 rounded-full"></div>
		</div>

		<div class="text-xs">
			<div class="flex p-2 space-x-2 bg-[#35363A] rounded-t-lg w-48">
				<img src="/images/svelte-icon.png" alt="" srcset="" class="w-4" />
				<div class="truncate">{title}</div>
			</div>
		</div>
	</div>

	<div class="bg-[#35363A] py-2 flex items-center">
		<div class="flex space-x-3 ml-4">
			<ArrowLeftOutline class="w-6 h-6" />
			<ArrowRightOutline class="w-6 h-6" />
			<ReloadOutline class="w-6 h-6" />
		</div>
		<div
			class="bg-[#212121] h-10 rounded-full py-1 px-2 flex items-center space-x-2 text-sm w-full mx-4"
		>
			<InfoOutlineIcon class="w-5 h-5" />
			<div>domain.tld</div>
		</div>
	</div>

	<div id="content" class={["min-w-screen", body].join(" ")}>
		<slot />
	</div>
</div>
