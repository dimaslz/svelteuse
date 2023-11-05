export default `
<!-- javascript -->
<script lang="ts">
	import { useSessionStorage } from "@dimaslz/svelteuse";

	const [storageValue, updateSessionStorage] = useSessionStorage<boolean>(
		"dimaslz-svelteuse",
		true,
	);

	const toggleTheme = () => {
		updateSessionStorage((prevValue) => {
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
