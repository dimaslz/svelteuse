<script lang="ts">
	import { onMount } from "svelte";
	import { writable } from "svelte/store";

	import { page } from "$app/stores";
	export let href: string;

	// export let activeClassName: string = "";
	// // export let withBackground: boolean = false;

	let isActive = writable(false);

	const className = [
		$$restProps.class,
		// withBackground
		// 	? isActive
		// 		? "text-white bg-gray-900 dark:bg-gray-700"
		// 		: "hover:bg-gray-900 dark:hover:bg-gray-700"
		// 	: "text-blue-500 hover:text-blue-700 hover:underline",
		"hover:text-gray-900 dark:hover:text-gray-700",
		// $isActive && (activeClassName || "is-active"),
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
