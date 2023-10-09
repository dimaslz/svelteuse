<script lang="ts">
	import { useLocation } from "@/hooks";

	const location = useLocation();
</script>

<div class="w-full">
	<h1 class="text-4xl">useLocation</h1>

	<div class="mt-4 space-y-4">
		<div class="px-4 py-2 bg-gray-950/50 text-xs border-l-4 text-gray-400">
			<p>Just works with SvelteKit</p>
		</div>

		<div class="p-4 bg-gray-950/50">
			<p>
				Value is <code>{JSON.stringify($location)}</code>
			</p>
		</div>
	</div>
</div>
