<script lang="ts">
	import { onMount } from "svelte";
	import hotkeys from "hotkeys-js";

	import { Header, Link } from "@/components";
	import { page } from "$app/stores";
	import InputText from "@/components/input-text/InputText.svelte";
	import XOutlineIcon from "@/components/icons/XOutlineIcon.svelte";

	export let data;

	let searchItems = data.links;
	let searchResults = data.links;
	let showSearch = false;

	const handleOnSearch = (event: Event) => {
		const { value } = event.target as HTMLInputElement;

		searchResults = searchItems.filter((item) => {
			return item.label.match(new RegExp(value, "i"));
		});
	};

	const handleOnCloseSearch = () => {
		showSearch = false;
	};

	onMount(() => {
		const pageSubscription = page.subscribe(({ route }) => {
			const linkIndex = data.links.findIndex(({ link }) => link === route.id);
			data.navigationLinks.prev = data.links[linkIndex - 1] || null;
			data.navigationLinks.next = data.links[linkIndex + 1] || null;
		});

		const handleOnCloseSearch = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				showSearch = false;
			}
		};

		hotkeys("command+k,ctrl-k", function () {
			showSearch = true;

			setTimeout(() => {
				const elm = document.getElementById("search-modal");
				elm?.querySelector("input")?.focus();
			}, 0);
		});

		window.addEventListener("keyup", handleOnCloseSearch, false);

		return () => {
			window.removeEventListener("keyup", handleOnCloseSearch, false);
			pageSubscription();
		};
	});
</script>

<Header fixed />

<div class="flex w-full h-auto">
	{#if showSearch}
		<div
			class="fixed inset-0 bg-gray-900/50 z-10 size-full flex justify-center items-center"
			id="search-modal"
		>
			<div
				class="my-0 mx-auto w-96 h-96 bg-gray-900 flex flex-col p-3 border border-gray-600 rounded-lg relative"
			>
				<div>
					<h2 class="text-2xl font-bold mb-2">Search you hook</h2>
					<button
						class="absolute top-2 right-2 hover:opacity-80 cursor-pointer"
						on:click={handleOnCloseSearch}
					>
						<XOutlineIcon class="size-8" />
					</button>
				</div>
				<InputText class="w-full" placeholder="search..." on:input={handleOnSearch} />

				<div class="h-full overflow-y-scroll mt-4 w-full">
					{#if searchResults.length === 0}
						<div class="size-full flex items-center justify-center">no results</div>
					{:else}
						<ul class="text-sm w-full">
							{#each searchResults as link}
								<li class="w-full flex">
									<Link href={link.link} type="menu" class="w-full">{link.label}</Link>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			</div>
		</div>
	{/if}

	<div
		class="flex h-screen flex-col bg-gray-950 divide-y divide-gray-600 pt-16 space-y-4 px-4"
		id="menu"
	>
		<div class="overflow-y-auto flex-1">
			<ul
				class="text-sm py-2 [&>li>a]:flex [&>li>a]:w-full [&>li>a]:items-center [&>li>a]:rounded-md [&>li>a]:p-2 [&>li>a.is-active]:bg-gray-900"
			>
				<li>
					<Link href="/guide/installation" type="menu">installation</Link>
				</li>
			</ul>

			<ul
				class="text-sm py-2 [&>li>a]:flex [&>li>a]:w-full [&>li>a]:items-center [&>li>a]:rounded-md [&>li>a]:p-2 [&>li>a.is-active]:bg-gray-900"
				id="sidebar"
			>
				{#each data.links as link}
					<li>
						<Link href={link.link} type="menu">{link.label}</Link>
					</li>
				{/each}
			</ul>
		</div>

		<div class="text-center px-2 py-4 text-xs">👨‍💻 with ♥️ and ☕️ from Barcelona</div>
	</div>

	<div class="h-screen flex px-4 pb-0 pt-16 flex-col" id="container">
		<div class="overflow-y-auto w-full p-[2rem_2rem_2rem]">
			<slot />

			<div class="w-full flex mt-4">
				<div class="w-full">
					{#if data.navigationLinks.prev}
						<Link href={data.navigationLinks.prev.link}>{data.navigationLinks.prev.label}</Link>
					{/if}
				</div>
				<div class="w-full flex justify-end">
					{#if data.navigationLinks.next}
						<Link href={data.navigationLinks.next.link}>{data.navigationLinks.next.label}</Link>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	:root {
		--vp-layout-max-width: 1440px;
		--vp-sidebar-width: 272px;
	}

	#menu {
		z-index: 1;
		width: 72px;
		max-width: 100%;
		position: fixed;
		left: 0px;
		top: 0px;
		bottom: 0px;
		padding-left: max(32px, calc((100% - (var(--vp-layout-max-width) - 64px)) / 2));
		width: calc((100% - (var(--vp-layout-max-width) - 64px)) / 2 + var(--vp-sidebar-width) - 32px);
	}

	#container {
		padding-right: calc((100vw - var(--vp-layout-max-width)) / 2);
		padding-left: calc((100vw - var(--vp-layout-max-width)) / 2 + var(--vp-sidebar-width));
		grow: 1;
		shrink: 0;
		width: 100%;
		min-width: 768px;
	}

	@media (max-width: 1440px) {
		#menu {
			width: var(--vp-sidebar-width);
		}
		#container {
			padding-left: var(--vp-sidebar-width);
		}
	}
</style>
