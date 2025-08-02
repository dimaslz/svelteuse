<script lang="ts">
	import { onMount } from "svelte";

	import { useClickAnyWhere } from "@/hooks";

	export let onClick: () => void;

	const eventClickAnyWhere = useClickAnyWhere(onClick);

	onMount(() => {
		return () => {
			eventClickAnyWhere();
		};
	});
</script>

<div data-testid="element">hello</div>
