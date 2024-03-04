<script lang="ts">
	import { useTimeoutFn } from "@/hooks";

	export let mockFn: () => void;
	export let ms: number | undefined = undefined;

	useTimeoutFn(mockFn, ms);
</script>
