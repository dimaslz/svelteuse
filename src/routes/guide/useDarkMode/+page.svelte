<script lang="ts">
	import { Browser, Button, DocTpl, H2, Highlight } from "@/components";
	import { useDarkMode } from "@/hooks";

	import code from "./code-snippet";

	const { isDarkMode, toggle } = useDarkMode();
</script>

<DocTpl title="useDarkMode">
	<div slot="visual-example">
		<H2>Visual Example</H2>

		<Browser>
			<div
				class={["p-4", $isDarkMode ? "bg-[#212121] text-white" : "bg-white text-gray-800"].join(
					" ",
				)}
			>
				<div>mode: {$isDarkMode ? "dark" : "light"}</div>
				<p class="pb-6">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, repellendus optio?
					Possimus quod velit corrupti, repellendus veritatis, sequi dicta natus necessitatibus
					architecto aut reprehenderit iure ducimus eligendi sunt animi illo.
				</p>
				<Button on:click={toggle}>toggle schema mode</Button>
			</div>
		</Browser>
	</div>

	<div slot="code-example">
		<H2>Code example</H2>

		<Highlight {code} />
	</div>
</DocTpl>
