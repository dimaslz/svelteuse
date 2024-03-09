export const exampleCode = `
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

export const sourceCode = `
import { useState } from "@dimaslz/svelteuse"

interface ImageStyle {
	// thumbnail: CSSProperties
	// fullSize: CSSProperties
	thumbnail: any;
	fullSize: any;
}

interface ImageOnLoadType {
	handleImageOnLoad: () => void;
	css: ImageStyle;
}

export function useImageOnLoad(): ImageOnLoadType {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	// Triggered when full image will be loaded.
	const handleImageOnLoad = () => {
		setIsLoaded(true);
	};

	const css: ImageStyle = {
		// Thumbnail style.
		thumbnail: {
			visibility: isLoaded ? "hidden" : "visible",
			filter: "blur(8px)",
			transition: "visibility 0ms ease-out 500ms",
		},
		// Full image style.
		fullSize: {
			opacity: isLoaded ? 1 : 0,
			transition: "opacity 500ms ease-in 0ms",
		},
	};

	return { handleImageOnLoad, css };
}
`;
