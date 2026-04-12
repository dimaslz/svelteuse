<script lang="ts">
	import { Header, Link } from "@/components";
	import { ClipboardOutlineIcon } from "@/components/icons";
	import { useClipboard } from "@/hooks";

	const [, copyClipboard] = useClipboard();

	let copied = false;

	type PackageManager = "npm" | "yarn" | "pnpm" | "bun";
	let selectedPm: PackageManager = "npm";

	const packageManagers: PackageManager[] = ["npm", "yarn", "pnpm", "bun"];

	const pmCommands: Record<PackageManager, string> = {
		npm: "npm add @dimaslz/svelteuse",
		yarn: "yarn add @dimaslz/svelteuse",
		pnpm: "pnpm add @dimaslz/svelteuse",
		bun: "bun add @dimaslz/svelteuse",
	};

	const copyCommand = () => {
		copyClipboard(pmCommands[selectedPm]);

		copied = true;
		setTimeout(() => {
			copied = false;
		}, 500);
	};
</script>

<div class="flex flex-col h-screen items-center w-full">
	<Header />

	<main class="h-full w-full">
		<div class="flex h-full flex-1 grow-0 w-full justify-center items-center flex-col">
			<div class="relative">
				<h1 class="md:text-8xl text-7xl text-[#ff3e00]">SvelteUse</h1>
				<span class="absolute right-0 top-0 text-lg">v0.0.2</span>
				<h2 class="text-sm md:text-center text-left">
					Svelte hooks library like React and Vue style
				</h2>
			</div>

			<div class="mt-12">
				<div class="flex gap-0 mb-0">
					{#each packageManagers as pm}
						<button
							on:click={() => (selectedPm = pm)}
							class={[
								"px-4 py-1 text-xs font-mono rounded-t-sm border-b-0 transition-colors cursor-pointer",
								selectedPm === pm
									? "bg-gray-900 text-gray-200 dark:bg-gray-200 dark:text-gray-900"
									: "bg-gray-700 text-gray-400 hover:bg-gray-800 dark:bg-gray-300 dark:text-gray-600 dark:hover:bg-gray-250",
							].join(" ")}
						>
							{pm}
						</button>
					{/each}
				</div>
				<code
					class={[
						"cursor-pointer relative flex rounded-sm rounded-tl-none text-sm text-gray-400 shadow-inner dark:text-gray-900 px-6 group z-10",
						!copied ? "bg-gray-900 hover:bg-gray-700 dark:bg-gray-200 dark:hover:bg-gray-100" : "",
					].join(" ")}
				>
					{#if copied}
						<div
							class="absolute inset-0 z-10 flex h-full w-full items-center justify-center rounded-sm bg-green-600/60 p-4 text-white"
						>
							copied!
						</div>
					{/if}

					<div>
						<button
							on:click={copyCommand}
							class="z-0 flex h-full w-full items-center justify-center rounded-sm p-4 font-mono cursor-pointer"
						>
							$ {pmCommands[selectedPm]}
						</button>
					</div>

					<div
						class="h-full w-8 items-center absolute right-0 top-0 bottom-0 hidden group-hover:flex"
					>
						<ClipboardOutlineIcon class="w-6 h-6 text-gray-600/40" />
					</div>
				</code>
			</div>

			<a
				class="text-red-600 hover:text-red-400 text-xs mt-2 p-1"
				href="https://www.npmjs.com/package/@dimaslz/svelteuse"
				>https://www.npmjs.com/package/@dimaslz/svelteuse</a
			>

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
