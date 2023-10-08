<script lang="ts">
	import "../app.css";
</script>

<svelte:head>
	<title>Svelte hook react like - by @dimaslz</title>
	<meta name="description" content="Dimas López resume - @dimaslz" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="flex flex-col h-screen items-center w-full">
	<main class="h-full w-full">
		<slot />
	</main>
</div>
