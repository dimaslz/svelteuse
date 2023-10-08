<script>
	import { Header, Link } from "@/components";
</script>

<Header fixed />

<div class="w-full flex h-full">
	<ul class="p-4 bg-gray-950 h-full pt-24" id="menu">
		<li>
			<Link href="./useState" class="text-sm">useState</Link>
		</li>
	</ul>

	<div class="w-[calc(100%-272px)] h-full p-4 pt-24">
		<slot />
	</div>
</div>

<style>
	#menu {
		width: 272px;
		max-width: 100%;
	}

	@media (min-width: 1440px) {
		#menu {
			padding-left: max(32px, calc((100% - (1440px - 64px)) / 2));
			width: calc((100% - (1440px - 64px)) / 2 + 272px - 32px);
		}
	}
</style>
