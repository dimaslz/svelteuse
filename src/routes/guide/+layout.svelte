<script lang="ts">
	import { onMount } from "svelte";

	import { Header, Link } from "@/components";
	import { page } from "$app/stores";

	export let data;

	onMount(() => {
		const pageSubscription = page.subscribe(({ route }) => {
			const linkIndex = data.links.findIndex(({ link }) => link === route.id);
			data.navigationLinks.prev = data.links[linkIndex - 1] || null;
			data.navigationLinks.next = data.links[linkIndex + 1] || null;
		});

		return () => {
			pageSubscription();
		};
	});
</script>

<Header fixed />

<div class="flex w-full h-auto">
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
		flex-grow: 1;
		flex-shrink: 0;
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
