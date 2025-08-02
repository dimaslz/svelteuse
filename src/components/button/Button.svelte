<script lang="ts">
	export let ref: HTMLButtonElement | null = null;
</script>

<button
	{...$$restProps}
	bind:this={ref}
	type="button"
	on:click|stopPropagation
	class={[
		"rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-hidden focus:ring-2 focus:ring-gray-600 dark:border-gray-700 dark:active:bg-gray-800 dark:focus:ring-gray-700 dark:focus:ring-offset-2 dark:focus:ring-offset-gray-900 m-1 cursor-pointer whitespace-nowrap",
		!$$restProps.disabled
			? "bg-gray-800 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700"
			: "",
		$$restProps.disabled ? "disabled:bg-gray-800/50 disabled:cursor-not-allowed" : "",
	].join(" ")}
>
	<slot />
</button>
