<script lang="ts">
	import { page } from "$app/stores";
	export let href: string;

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

	page.subscribe(({ url }) => {
		if (href.startsWith("./")) {
			href = `${url.pathname}${href.replace("./", "/")}`;
		}
	});
	// if (window) {
	// 	if (href.startsWith("./")) {
	// 		href = `${window?.location?.pathname}${href.replace("./", "/")}`;
	// 	}
	// }
</script>

<a {...$$restProps} class={className} {href}><slot /></a>
