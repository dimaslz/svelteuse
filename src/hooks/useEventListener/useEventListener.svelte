<script lang="ts">
	import { onMount } from "svelte";

	import { useEventListener } from "@/hooks";

	export let callbackListener: () => void;
	export let eventType: string = "click";
	export let element: Element | Window;

	const eventListenerInstance = useEventListener<MouseEvent>(eventType, callbackListener, element);

	onMount(() => {
		return () => {
			eventListenerInstance();
		};
	});
</script>

<div>hello</div>
