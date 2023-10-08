module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:tailwindcss/recommended",
		"plugin:svelte/recommended",
		"prettier",
	],
	plugins: ["@typescript-eslint", "prettier", "simple-import-sort"],
	overrides: [
		{
			files: ["*.svelte"],
			parser: "svelte-eslint-parser",
			// Parse the `<script>` in `.svelte` as TypeScript by adding the following configuration.
			parserOptions: {
				parser: "@typescript-eslint/parser",
			},
		},
	],
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2020,
		extraFileExtensions: [".svelte"],
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	rules: {
		"prettier/prettier": "error",

		// typescript
		"@typescript-eslint/no-explicit-any": "warn",

		"simple-import-sort/imports": "error",
		"simple-import-sort/exports": "error",

		"tailwindcss/no-custom-classname": [
			"warn",
			{
				// "callees": Array<string>,
				// "config": <string>|<object>,
				// "cssFiles": Array<string>,
				// "cssFilesRefreshRate": <number>,
				// "skipClassAttribute": <boolean>,
				// "tags": Array<string>,
				// "whitelist": Array<string>,
				whitelist: [],
			},
		],
	},
};
