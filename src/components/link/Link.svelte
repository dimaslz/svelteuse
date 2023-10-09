<script lang="ts">
	import { useLocation } from "@/hooks";
	export let href: string;

	const location = useLocation();
	// export let activeClassName: string = "";
	// export let withBackground: boolean = false;

	const className = [
		$$restProps.class,
		// withBackground
		// 	? isActive
		// 		? "text-white bg-gray-900 dark:bg-gray-700"
		// 		: "hover:bg-gray-900 dark:hover:bg-gray-700"
		// 	: "text-blue-500 hover:text-blue-700 hover:underline",
		"hover:text-gray-900 dark:hover:text-gray-700",
		// isActive && (activeClassName || "is-active"),
		"is-active",
	]
		.filter(Boolean)
		.join(" ");

	location.subscribe(({ pathname }) => {
		if (href.startsWith("./")) {
			href = `${pathname}${href.replace("./", "/")}`;
		}
	});
</script>

<a {...$$restProps} class={className} {href}><slot /></a>
