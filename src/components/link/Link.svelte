<script lang="ts">
	import { onMount } from "svelte";
	import { writable } from "svelte/store";

	import { page } from "$app/stores";
	export let href: string;
	export let type: string = "link"; // link, menu, button
	export let outline: boolean = false;

	// export let activeClassName: string = "";
	// // export let withBackground: boolean = false;

	let isActive = writable(false);

	const className = [
		// $$restProps.class,
		// withBackground
		// 	? isActive
		// 		? "text-white bg-gray-900 dark:bg-gray-700"
		// 		: "hover:bg-gray-900 dark:hover:bg-gray-700"
		// 	: "text-blue-500 hover:text-blue-700 hover:underline",
		// "hover:text-gray-900 dark:hover:text-gray-700",
		type === "menu" ? "hover:text-gray-900 dark:hover:text-gray-700" : "",
		type === "link"
			? "underline text-[#ff3e00]/80 hover:text-[#ff3e00] dark:hover:text-[#ff3e00]"
			: "",
		type === "button"
			? outline
				? "border border-[#ff3e00]/80 hover:border-[#ff3e00]  py-2 px-4 rounded-sm text-[#ff3e00]/80 hover:text-[#ff3e00] dark:hover:text-[#ff3e00] mt-12 !no-underline"
				: "bg-[#ff3e00]/80 hover:bg-[#ff3e00] py-2 px-4 rounded-sm text-white hover:text-white dark:hover:text-white mt-12"
			: "",
		// $isActive && (activeClassName || "is-active"),
		$$restProps.class,
	]
		.filter(Boolean)
		.join(" ");

	onMount(() => {
		page.subscribe((pageUpdate) => {
			isActive.set(pageUpdate.url.pathname === href);
		});
	});

	delete $$restProps.class;
</script>

<a class={[className, $isActive ? "is-active" : ""].join(" ")} {href} {...$$restProps}>
	<slot />
</a>
