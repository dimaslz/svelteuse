<script>
	import { Header, Link } from "@/components";
</script>

<Header fixed />

<div class="w-full flex h-full flex-col">
	<div class="flex w-full h-full">
		<div class="flex flex-col bg-gray-950 divide-y divide-gray-600 pt-24 space-y-4 px-4" id="menu">
			<ul class="text-sm py-2">
				<li>
					<Link href="/guide/installation">installation</Link>
				</li>
			</ul>

			<ul class="h-full text-sm py-2">
				<li>
					<Link href="/guide/useState">useState</Link>
				</li>
				<li>
					<Link href="/guide/useLocation">useLocation</Link>
				</li>
				<li>
					<Link href="/guide/useBoolean">useBoolean</Link>
				</li>
				<li>
					<Link href="/guide/useCounter">useCounter</Link>
				</li>
				<li>
					<Link href="/guide/useEventListener">useEventListener</Link>
				</li>
				<li>
					<Link href="/guide/useDebounce">useDebounce</Link>
				</li>
			</ul>

			<div class="text-center px-2 py-4 text-xs">👨‍💻 with ♥️ and ☕️ from Barcelona</div>
		</div>

		<div class="w-[calc(100%-272px)] h-full p-4 pt-24" id="container">
			<slot />
		</div>
	</div>
</div>

<style>
	#menu {
		width: 272px;
		max-width: 100%;
	}

	@media (min-width: 1440px) {
		#container {
			padding-right: calc((100vw - 1440px) / 2);
		}

		#menu {
			padding-left: max(32px, calc((100% - (1440px - 64px)) / 2));
			width: calc((100% - (1440px - 64px)) / 2 + 272px - 32px);
		}
	}
</style>
