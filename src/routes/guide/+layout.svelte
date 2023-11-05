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

			<ul
				class="h-full text-sm py-2 [&>li>a]:flex [&>li>a]:w-full [&>li>a]:items-center [&>li>a]:rounded-md [&>li>a]:p-2 [&>li>a.is-active]:bg-gray-900"
			>
				<li>
					<Link href="/guide/useState">useState</Link>
				</li>
				<!-- <li>
					<Link href="/guide/useLocation">useLocation</Link>
				</li> -->
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
				<li>
					<Link href="/guide/useDebounceFn">useDebounceFn</Link>
				</li>
				<li>
					<Link href="/guide/useThrottle">useThrottle</Link>
				</li>
				<li>
					<Link href="/guide/useThrottleFn">useThrottleFn</Link>
				</li>
				<li>
					<Link href="/guide/useClipboard">useClipboard</Link>
				</li>
				<li>
					<Link href="/guide/useLocalStorage">useLocalStorage</Link>
				</li>
				<li>
					<Link href="/guide/useMediaQuery">useMediaQuery</Link>
				</li>
				<li>
					<Link href="/guide/useDarkMode">useDarkMode</Link>
				</li>
				<li>
					<Link href="/guide/useDocumentTitle">useDocumentTitle</Link>
				</li>
				<li>
					<Link href="/guide/useElementSize">useElementSize</Link>
				</li>
				<li>
					<Link href="/guide/useFetch">useFetch</Link>
				</li>
				<li>
					<Link href="/guide/useHover">useHover</Link>
				</li>
				<li>
					<Link href="/guide/useIntervalFn">useIntervalFn</Link>
				</li>
				<li>
					<Link href="/guide/useScreen">useScreen</Link>
				</li>
				<li>
					<Link href="/guide/useScript">useScript</Link>
				</li>
				<li>
					<Link href="/guide/useSessionStorage">useSessionStorage</Link>
				</li>
				<li>
					<Link href="/guide/useTimeoutFn">useTimeoutFn</Link>
				</li>
				<li>
					<Link href="/guide/useToggle">useToggle</Link>
				</li>
				<li>
					<Link href="/guide/useWindowSize">useWindowSize</Link>
				</li>
				<li>
					<Link href="/guide/useImageOnLoad">useImageOnLoad</Link>
				</li>
				<li>
					<Link href="/guide/useMap">useMap</Link>
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
