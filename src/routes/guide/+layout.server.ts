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
