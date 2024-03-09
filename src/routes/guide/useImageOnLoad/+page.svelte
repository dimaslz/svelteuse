<script lang="ts">
	import { Browser, DocTpl, H2, Highlight } from "@/components";
	import { useImageOnLoad } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	const { handleImageOnLoad, css } = useImageOnLoad();

	const style: { [key: string]: Partial<CSSStyleDeclaration> } = {
		wrap: {
			position: "relative",
			width: "400px",
			height: "400px",
			margin: "auto",
		},
		image: {
			position: "absolute",
			top: "0px",
			left: "0px",
			width: `100%`,
			height: `100%`,
		},
	};
</script>

<DocTpl title="useImageOnLoad">
	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				<img
					style={{ ...style.image, ...css.thumbnail }}
					src="https://via.placeholder.com/150"
					alt="thumbnail"
					width="150"
					height="150"
				/>

				<img
					on:load={handleImageOnLoad}
					style={{ ...style.image, ...css.fullSize }}
					src="https://via.placeholder.com/600"
					alt="fullImage"
					width="600"
					height="600"
				/>
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
