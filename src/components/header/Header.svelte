<script lang="ts">
	export let fixed: boolean = false;

	const classes = ["w-full h-16 flex", fixed ? "fixed top-0 left-0 right-0" : ""].join(" ");
</script>

<header class={classes} {...$$restProps}>
	<div class="flex flex-1 items-center px-4 font-bold text-[#ff3e00] justify-start" id="logo">
		<a href="/" class="border-b border-gray-700 w-full h-full flex items-center">SvelteUse</a>
	</div>
	<nav class="w-full flex items-center justify-end py-2 px-4">...</nav>
</header>

<style>
	#logo {
		min-width: 272px;
		max-width: 100%;
	}

	@media (min-width: 1440px) {
		#logo {
			padding-left: max(32px, calc((100% - (1440px - 64px)) / 2));
			width: calc((100% - (1440px - 64px)) / 2 + 272px - 32px);
		}
	}
</style>
