export default `
<!-- javascript -->
<script lang="ts">
	import { useLocalStorage } from "@dimaslz/svelteuse";

	const { store: storageValue, update: updateLocalStorage} = useLocalStorage<boolean>("dimaslz-svelteuse", true);

	const toggleTheme = () => {
		updateLocalStorage((prevValue) => {
			return !prevValue;
		});
	};
</script>

<!-- html -->
<div>
	<p>
		Value is <code>{JSON.stringify($storageValue)}</code>
	</p>
	<button on:click={toggleTheme}>update state</button>
</div>
`;
