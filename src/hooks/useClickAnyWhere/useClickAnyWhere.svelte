<script lang="ts">
	import { useClickAnyWhere } from "@/hooks";

	export let onClick: () => any;

	useClickAnyWhere(onClick);
</script>

<div data-testid="element">hello</div>
