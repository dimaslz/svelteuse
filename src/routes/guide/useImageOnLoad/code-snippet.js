export default `
<!-- javascript -->
<script lang="ts">
	import { useImageOnLoad } from "@dimaslz/svelteuse";

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
			width: \`100%\`,
			height: \`100%\`,
		},
	};
</script>

<!-- html -->
<div>
	<img
		style={{ ...style.image, ...css.thumbnail }}
		src="https://via.placeholder.com/150"
		alt="thumbnail"
	/>

	<img
		on:load={handleImageOnLoad}
		style={{ ...style.image, ...css.fullSize }}
		src="https://via.placeholder.com/600"
		alt="fullImage"
	/>
</div>

`;
