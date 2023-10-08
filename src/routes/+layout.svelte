<script lang="ts">
	import "../app.css";

	import { Header } from "@/components";
</script>

<svelte:head>
	<title>Svelte hook react like - by @dimaslz</title>
	<meta name="description" content="Dimas López resume - @dimaslz" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="flex flex-col h-full items-center px-4">
	<Header />

	<main class="h-full">
		<slot />
	</main>
</div>
