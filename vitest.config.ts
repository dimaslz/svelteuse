import { mergeConfig } from "vite";
import { defineConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			globals: true,
			environment: "jsdom",
			setupFiles: "./test/setup.ts",
			css: true,
			exclude: ["**/node_modules"],
			include: ["src/**/*.{test,spec}.{js,ts}"],
			alias: [{ find: /^svelte$/, replacement: "svelte/internal" }],
		},
	}),
);
