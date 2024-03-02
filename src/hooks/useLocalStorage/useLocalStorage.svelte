<script lang="ts">
	import { useLocalStorage } from "@/hooks";

	const { store, update, reset, clear } = useLocalStorage<boolean>("dimaslz-svelteuse", true);

	const toggleTheme = () => {
		update((prevValue) => {
			return !prevValue;
		});
	};
</script>

<div>
	<p>
		Value is {JSON.stringify($store)}
	</p>

	<button on:click={toggleTheme}>update state</button>
	<button on:click={reset}>reset state</button>
	<button on:click={clear}>clear state</button>
</div>
