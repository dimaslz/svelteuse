<script lang="ts">
	import { Browser, Button, DocTpl, H2, Highlight } from "@/components";
	import { useDarkMode } from "@/hooks";

	import code from "./code-snippet";

	const { isDarkMode, toggle } = useDarkMode();
</script>

<DocTpl title="useDarkMode">
	<div slot="description">
		<p>
			This hook is to control the dark mode setup. This is getting the system mode and store it on a
			localStorage into the key <code class="text-gray-400 font-mono">dark-mode</code>. On change
			the value, will update the localStore value.
		</p>
	</div>

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
