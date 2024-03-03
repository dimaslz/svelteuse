<script lang="ts">
	import { useScript } from "@/hooks";

	export let scriptSrc;

	const status = useScript(scriptSrc, {
		removeOnUnmount: true,
	});
</script>

<div>
	<code>
		{$status}
	</code>
</div>
