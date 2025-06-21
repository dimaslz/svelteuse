<script lang="ts">
	import { useScroll } from "@/hooks/useScroll/useScroll";
	import { onMount } from "svelte";

	const { scroll, scrollTo, trackScroll } = useScroll();

	onMount(() => {
		scrollTo({ top: 250, left: 250 })
	})
</script>

<div class="flex bg-gray-950">
	<div use:trackScroll class="relative overflow-scroll w-[500px] h-[500px]">
		<div class="w-[1000px] h-[1000px] flex items-center justify-center relative">
			<div class="absolute top-0 left-0">top left</div>
			<div class="absolute top-0 right-0">top right</div>
			<div>scroll here</div>
			<div class="absolute bottom-0 left-0">bottom left</div>
			<div class="absolute bottom-0 right-0">bottom right</div>
		</div>
	</div>

	<div>
		<pre class="text-sm">{JSON.stringify($scroll, null, 2)}</pre>

		<div class="flex flex-col">
			<button
				on:click={() => scrollTo({ top: 0, behavior: "smooth" })}
				class="cursor-pointer bg-[#ff3e00]/80 hover:bg-[#ff3e00] py-2 px-4 rounded-xs text-white hover:text-white dark:hover:text-white mt-4"
			>
				Scroll to top
			</button>
			<button
				on:click={() => scrollTo({ top: 0, left: 0, behavior: "smooth" })}
				class="cursor-pointer bg-[#ff3e00]/80 hover:bg-[#ff3e00] py-2 px-4 rounded-xs text-white hover:text-white dark:hover:text-white mt-4"
			>
				Scroll to top-left
			</button>
			<button
				on:click={() => scrollTo({ top: 0, left: 1000, behavior: "smooth" })}
				class="cursor-pointer bg-[#ff3e00]/80 hover:bg-[#ff3e00] py-2 px-4 rounded-xs text-white hover:text-white dark:hover:text-white mt-4"
			>
				Scroll to top-right
			</button>
			<button
				on:click={() => scrollTo({ top: 1000, behavior: "smooth" })}
				class="cursor-pointer bg-[#ff3e00]/80 hover:bg-[#ff3e00] py-2 px-4 rounded-xs text-white hover:text-white dark:hover:text-white mt-4"
			>
				Scroll to bottom
			</button>
			<button
				on:click={() => scrollTo({ top: 1000, left: 0, behavior: "smooth" })}
				class="cursor-pointer bg-[#ff3e00]/80 hover:bg-[#ff3e00] py-2 px-4 rounded-xs text-white hover:text-white dark:hover:text-white mt-4"
			>
				Scroll to bottom-left
			</button>
			<button
				on:click={() => scrollTo({ top: 1000, left: 1000, behavior: "smooth" })}
				class="cursor-pointer bg-[#ff3e00]/80 hover:bg-[#ff3e00] py-2 px-4 rounded-xs text-white hover:text-white dark:hover:text-white mt-4"
			>
				Scroll to bottom-right
			</button>
		</div>
	</div>
</div>
