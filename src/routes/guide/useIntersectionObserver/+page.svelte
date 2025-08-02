<script lang="ts">
	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";

	import { exampleCode, sourceCode } from "./code-snippet";
	import { useIntersectionObserver } from "@/hooks";

	// example
	const {
		action: intersectionObserver,
		isIntersecting,
		entry,
	} = useIntersectionObserver({
		threshold: 0.5,
		rootMargin: "0px",
		// freezeOnceVisible: true,
		// initialIsIntersecting: false,
		onChange: (intersecting, entry) => {
			console.log("Changed:", intersecting, entry.target.textContent);
			if (intersecting) {
				entry.target.classList.remove("bg-red-300");
				entry.target.classList.add("bg-green-300");
			} else {
				entry.target.classList.remove("bg-green-300");
				entry.target.classList.add("bg-red-300");
			}
		},
	});

	const sections = Array.from({ length: 5 }, (_, i) => `${i + 1}`);
</script>

<DocTpl title="useIntersectionObserver">
	<div slot="description">
		<p>
			Custom hook that tracks the intersection of a DOM element with its containing element or the
			viewport using the <code>Intersection Observer API</code>.
		</p>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks-ts.com/react-hook/use-intersection-observer" target="_blank"
					>https://usehooks-ts.com/react-hook/use-intersection-observer</Link
				>
			</li>
			<li>
				<Link href="https://usehooks.com/useintersectionobserver" target="_blank"
					>https://usehooks.com/useintersectionobserver</Link
				>
			</li>
			<li>
				<Link href="https://vueuse.org/core/useIntersectionObserver" target="_blank"
					>https://vueuse.org/core/useIntersectionObserver</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50 h-[400px] overflow-scroll">
			<div>
				{#each sections as title (title)}
					<section
						class="h-[400px] flex items-center justify-center text-black text-4xl"
						{title}
						use:intersectionObserver
					>
						intersecting block {title}
					</section>
				{/each}
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
