<script lang="ts">
	import { Header, Link } from "@/components";
</script>

<svelte:head>
	<title>Svelte hook react like - by @dimaslz</title>
	<meta name="description" content="Dimas López resume - @dimaslz" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="flex flex-col h-screen items-center w-full">
	<Header />

	<main class="h-full w-full">
		<div class="flex h-full flex-1 flex-grow-0 w-full justify-center items-center flex-col">
			<h1 class="text-4xl text-[#ff3e00]">SvelteUse</h1>
			<h2 class="text-xs">home</h2>

			<Link href="/guide" class="bg-[#ff3e00] py-2 px-4 rounded-full text-white mt-12"
				>Get started</Link
			>
		</div>
	</main>
</div>
