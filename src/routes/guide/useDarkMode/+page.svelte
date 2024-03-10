<script lang="ts">
	import { Browser, Button, DocTpl, H2, Highlight, Link } from "@/components";
	import { useDarkMode } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	const { isDarkMode, toggle } = useDarkMode();
</script>

<DocTpl title="useDarkMode">
	<div slot="description">
		<p>
			This hook is to control the dark mode setup. This is getting the system mode and store it on a
			localStorage into the key <code class="text-gray-400 font-mono">dark-mode</code>. On change
			the value, will update the localStore value.
		</p>

		<h3 class="text-lg">Related hooks</h3>
		<ul class="list-disc pl-6">
			<li><Link href="/guide/useMediaQuery">useMediaQuery</Link></li>
			<li><Link href="/guide/useLocalStorage">useLocalStorage</Link></li>
		</ul>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks-ts.com/react-hook/use-dark-mode"
					>https://usehooks-ts.com/react-hook/use-dark-mode</Link
				>
			</li>
			<li>
				<Link href="https://vueuse.org/core/useDark/">https://vueuse.org/core/useDark/</Link>
			</li>
		</ul>
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
		<div>
			<H2>Code base</H2>

			<Highlight language="typescript" code={sourceCode} />
		</div>

		<div class="mt-12">
			<H2>Code example</H2>

			<Highlight code={exampleCode} />
		</div>
	</div>
</DocTpl>
