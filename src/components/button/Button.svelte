<script lang="ts">
	export let ref: HTMLButtonElement | null = null;
</script>

<button
	{...$$restProps}
	bind:this={ref}
	type="button"
	on:click|stopPropagation
	class="mb-2 mr-2 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:focus:ring-offset-2 dark:focus:ring-offset-gray-900"
>
	<slot />
</button>
