export default `
<!-- javascript -->
<script lang="ts">
	import { useDarkMode } from "@dimaslz/svelteuse";

	const { isDarkMode, toggle, enable, disable } = useDarkMode(false);
</script>

<!-- html -->
<div
	class={[
		"p-4",
		$isDarkMode ? "bg-[#212121] text-white" : "bg-white text-gray-800"
	].join(" ")}
>
	<p class="pb-6">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, repellendus optio?
		Possimus quod velit corrupti, repellendus veritatis, sequi dicta natus necessitatibus
		architecto aut reprehenderit iure ducimus eligendi sunt animi illo.
	</p>
	<Button on:click={toggle}>toggle schema mode</Button>
</div>

`;
