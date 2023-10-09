import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./test/setup.ts",
		css: true,
		exclude: ["**/node_modules"],
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			"~": path.resolve(__dirname),
		},
	},
});
