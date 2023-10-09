<script lang="ts">
	import { Link } from "@/components";

	export let fixed: boolean = false;

	const classes = ["w-full h-16 flex", fixed ? "fixed top-0 left-0 right-0" : ""].join(" ");
</script>

<header class={classes} {...$$restProps}>
	<div class="flex flex-1 items-center px-4 font-bold text-[#ff3e00] justify-start" id="logo">
		<a
			href="/"
			class={["w-full h-full flex items-center", fixed ? "border-b border-gray-700" : ""].join(" ")}
			>SvelteUse</a
		>
	</div>
	<nav class="w-full flex items-center justify-end py-2 px-4 text-sm text-gray-400">
		<ul class="flex divide-x">
			<li><Link href="/about" class="px-4 py-2 hover:text-[#ff3e00]">about</Link></li>
			<li><Link href="/github" class="px-4 py-2 hover:text-[#ff3e00]">github</Link></li>
		</ul>
	</nav>
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
