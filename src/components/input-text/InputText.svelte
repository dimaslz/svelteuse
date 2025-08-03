<script lang="ts">
	export let value = "";
	export let size = "md";

	const SIZE = {
		sm: "h-6",
		md: "h-8",
		lg: "h-10",
	}[size];
</script>

<input
	bind:value
	on:input
	on:focus
	{...$$restProps}
	class={[
		"rounded-lg bg-gray-800 px-3 text-sm font-medium text-white hover:bg-gray-900 focus:outline-hidden focus:ring-2 focus:ring-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:focus:ring-offset-2 dark:focus:ring-offset-gray-900 z-10 relative w-full",
		$$restProps.class,
		SIZE,
	].join(" ")}
/>
