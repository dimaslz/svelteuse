/** @type {import('./$types').PageServerLoad} */
export async function load({ route }) {
	type LinkT = {
		label: string;
		link: string;
	};

	const links = [
		{
			label: "useBoolean",
			link: "/guide/useBoolean",
		},
		{
			label: "useClickAnyWhere",
			link: "/guide/useClickAnyWhere",
		},
		{
			label: "useClickOutside",
			link: "/guide/useClickOutside",
		},
		{
			label: "useClipboard",
			link: "/guide/useClipboard",
		},
		{
			label: "useCounter",
			link: "/guide/useCounter",
		},
		{
			label: "useDarkMode",
			link: "/guide/useDarkMode",
		},
		{
			label: "useDebounce",
			link: "/guide/useDebounce",
		},
		{
			label: "useDebounceFn",
			link: "/guide/useDebounceFn",
		},
		{
			label: "useDocumentTitle",
			link: "/guide/useDocumentTitle",
		},
		{
			label: "useElementSize",
			link: "/guide/useElementSize",
		},
		{
			label: "useEventListener",
			link: "/guide/useEventListener",
		},
		{
			label: "useFetch",
			link: "/guide/useFetch",
		},
		{
			label: "useHover",
			link: "/guide/useHover",
		},
		{
			label: "useImageOnLoad",
			link: "/guide/useImageOnLoad",
		},
		{
			label: "useInterval",
			link: "/guide/useInterval",
		},
		{
			label: "useIntervalFn",
			link: "/guide/useIntervalFn",
		},
		{
			label: "useLocalStorage",
			link: "/guide/useLocalStorage",
		},
		{
			label: "useMap",
			link: "/guide/useMap",
		},
		{
			label: "useMediaQuery",
			link: "/guide/useMediaQuery",
		},
		{
			label: "useScreen",
			link: "/guide/useScreen",
		},
		{
			label: "useScript",
			link: "/guide/useScript",
		},
		{
			label: "useSessionStorage",
			link: "/guide/useSessionStorage",
		},
		{
			label: "useState",
			link: "/guide/useState",
		},
		{
			label: "useThrottle",
			link: "/guide/useThrottle",
		},
		{
			label: "useThrottleFn",
			link: "/guide/useThrottleFn",
		},
		{
			label: "useTimeout",
			link: "/guide/useTimeout",
		},
		{
			label: "useTimeoutFn",
			link: "/guide/useTimeoutFn",
		},
		{
			label: "useToggle",
			link: "/guide/useToggle",
		},
		{
			label: "useWindowSize",
			link: "/guide/useWindowSize",
		},
		{
			label: "useLocation",
			link: "/guide/useLocation",
		},
		{
			label: "useEventCallback",
			link: "/guide/useEventCallback",
		},
		{
			label: "usePreferredDark",
			link: "/guide/usePreferredDark",
		},
		{
			label: "useCountdown",
			link: "/guide/useCountdown",
		},
		{
			label: "useIntersectionObserver",
			link: "/guide/useIntersectionObserver",
		},
		{
			label: "useMouseInElement",
			link: "/guide/useMouseInElement",
		},
		{
			label: "useRandomInterval",
			link: "/guide/useRandomInterval",
		},
		{
			label: "useNow",
			link: "/guide/useNow",
		},
		{
			label: "useIsClient",
			link: "/guide/useIsClient",
		},
		{
			label: "useTransition",
			link: "/guide/useTransition",
		},
		{
			label: "usePrevious",
			link: "/guide/usePrevious",
		},
		{
			label: "useOrientation",
			link: "/guide/useOrientation",
		},
		{
			label: "usePreferredLanguage",
			link: "/guide/usePreferredLanguage",
		},
		{
			label: "useContinuousRetry",
			link: "/guide/useContinuousRetry",
		},
		{
			label: "useLongPress",
			link: "/guide/useLongPress",
		},
		{
			label: "useVisibilityChange",
			link: "/guide/useVisibilityChange",
		},
		{
			label: "useWindowFocus",
			link: "/guide/useWindowFocus",
		},
		{
			label: "useScroll",
			link: "/guide/useScroll",
		},
		{
			label: "useMeasure",
			link: "/guide/useMeasure",
		},
		{
			label: "useFavicon",
			link: "/guide/useFavicon",
		},
		{
			label: "useList",
			link: "/guide/useList",
		},
		{
			label: "useStep",
			link: "/guide/useStep",
		},
		{
			label: "useStepper",
			link: "/guide/useStepper",
		},
		{
			label: "useHistory",
			link: "/guide/useHistory",
		},
		{
			label: "useThrottledHistory",
			link: "/guide/useThrottledHistory",
		},
		{
			label: "useIdle",
			link: "/guide/useIdle",
		},
		{
			label: "useObjectState",
			link: "/guide/useObjectState",
		},
		{
			label: "useAsyncState",
			link: "/guide/useAsyncState",
		},
		{
			label: "useScrollLock",
			link: "/guide/useScrollLock",
		},
		{
			label: "useStorage",
			link: "/guide/useStorage",
		},
		{
			label: "useTextSelection",
			link: "/guide/useTextSelection",
		},
		{
			label: "useUrlSearchParams",
			link: "/guide/useUrlSearchParams",
		},
	];

	const navigationLinks: {
		prev: LinkT | null;
		next: LinkT | null;
	} = {
		prev: { link: "", label: "" },
		next: { link: "", label: "" },
	};

	const linkIndex = links.findIndex(({ link }) => link === route.id);
	navigationLinks.prev = links[linkIndex - 1] || null;
	navigationLinks.next = links[linkIndex + 1] || null;

	return { links, navigationLinks };
}
