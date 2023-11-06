<script>
	import { Header, Link } from "@/components";
</script>

<Header fixed />

<div class="flex w-full h-auto">
	<div
		class="flex h-screen flex-col bg-gray-950 divide-y divide-gray-600 pt-16 space-y-4 px-4"
		id="menu"
	>
		<div class="overflow-y-auto flex-1">
			<ul
				class="text-sm py-2 [&>li>a]:flex [&>li>a]:w-full [&>li>a]:items-center [&>li>a]:rounded-md [&>li>a]:p-2 [&>li>a.is-active]:bg-gray-900"
			>
				<li>
					<Link href="/guide/installation">installation</Link>
				</li>
			</ul>

			<ul
				class="text-sm py-2 [&>li>a]:flex [&>li>a]:w-full [&>li>a]:items-center [&>li>a]:rounded-md [&>li>a]:p-2 [&>li>a.is-active]:bg-gray-900"
			>
				<li>
					<Link href="/guide/useState">useState</Link>
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
		</div>

		<div class="text-center px-2 py-4 text-xs">👨‍💻 with ♥️ and ☕️ from Barcelona</div>
	</div>

	<div class="h-screen flex px-4 pb-0 pt-16" id="container">
		<div class="overflow-y-auto w-full p-[2rem_2rem_2rem]">
			<slot />
		</div>
	</div>
</div>

<style>
	:root {
		--vp-layout-max-width: 1440px;
		--vp-sidebar-width: 272px;
	}

	#menu {
		z-index: 1;
		width: 72px;
		max-width: 100%;
		position: fixed;
		left: 0px;
		top: 0px;
		bottom: 0px;
		padding-left: max(32px, calc((100% - (var(--vp-layout-max-width) - 64px)) / 2));
		width: calc((100% - (var(--vp-layout-max-width) - 64px)) / 2 + var(--vp-sidebar-width) - 32px);
	}

	#container {
		padding-right: calc((100vw - var(--vp-layout-max-width)) / 2);
		padding-left: calc((100vw - var(--vp-layout-max-width)) / 2 + var(--vp-sidebar-width));
		flex-grow: 1;
		flex-shrink: 0;
		width: 100%;
		min-width: 768px;
	}

	@media (max-width: 1440px) {
		#menu {
			width: var(--vp-sidebar-width);
		}
		#container {
			padding-left: var(--vp-sidebar-width);
		}
	}
</style>
