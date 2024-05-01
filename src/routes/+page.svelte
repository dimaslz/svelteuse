<script lang="ts">
	import { Header, Link } from "@/components";
	import { ClipboardOutlineIcon } from "@/components/icons";
	import { useClipboard } from "@/hooks";

	const [, copyClipboard] = useClipboard();

	let copied = false;

	const copyCommand = ($event: Event) => {
		const value: string = ($event.target as HTMLButtonElement).textContent || "";

		copyClipboard(value?.replace("$ ", ""));

		copied = true;
		setTimeout(() => {
			copied = false;
		}, 500);
	};
</script>

<div class="flex flex-col h-screen items-center w-full">
	<Header />

	<main class="h-full w-full">
		<div class="flex h-full flex-1 flex-grow-0 w-full justify-center items-center flex-col">
			<h1 class="md:text-8xl text-7xl text-[#ff3e00]">SvelteUse</h1>
			<h2 class="text-sm md:text-center text-left">
				Svelte hooks library like React and Vue style
			</h2>

			<div class="mt-12">
				<code
					class={[
						"relative flex cursor-pointer rounded text-sm text-gray-400 shadow-inner dark:text-gray-900 px-6 group",
						!copied ? "bg-gray-900 hover:bg-gray-700 dark:bg-gray-200 dark:hover:bg-gray-100" : "",
					].join(" ")}
				>
					{#if copied}
						<div
							class="absolute inset-0 z-10 flex h-full w-full items-center justify-center rounded bg-green-600/60 p-4 text-white"
						>
							copied!
						</div>
					{/if}

					<button
						on:click={copyCommand}
						class="z-0 flex h-full w-full items-center justify-center rounded p-4 font-mono"
					>
						$ npm add @dimaslz/svelteuse
					</button>

					<div
						class="h-full w-8 items-center absolute right-0 top-0 bottom-0 hidden group-hover:flex"
					>
						<ClipboardOutlineIcon class="w-6 h-6 text-gray-600/40" />
					</div>
				</code>
			</div>

			<p class="mt-12">
				This project has been inspired on <Link href="https://usehooks.com" target="_blank"
					>https://usehooks.com</Link
				>, <Link href="https://usehooks-ts.com" target="_blank">https://usehooks-ts.com</Link> and <Link
					href="https://vueuse.org"
					target="_blank">https://vueuse.org</Link
				>.
			</p>

			<div class="flex space-x-4">
				<Link href="/guide/installation" type="button">Get started</Link>
				<Link href="https://github.com/dimaslz/svelteuse" type="button" outline>Github</Link>
			</div>
		</div>
	</main>

	<footer class="text-center px-2 py-4 text-base">
		👨‍💻 with ♥️ and ☕️ from Barcelona - <Link href="https://github.com/dimaslz" target="_blank"
			>gh</Link
		> |
		<Link href="https://www.linkedin.com/in/dimaslopezzurita" target="_blank">in</Link> | <Link
			href="https://x.com/dimaslz"
			target="_blank">tw</Link
		>
	</footer>
</div>
