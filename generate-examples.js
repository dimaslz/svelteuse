import fs from "fs/promises";

(async () => {
	const hookFiles = (await fs.readdir("./src/hooks", { recursive: true }))
		.filter(
			(file) =>
				!file.endsWith(".test.ts") &&
				!file.endsWith("index.ts") &&
				!file.endsWith(".svelte") &&
				!file.endsWith("types.d.ts") &&
				file.endsWith(".ts"),
		)
		.map((hook) => {
			const [, name] = hook.split("/");
			return {
				[name.replace(".ts", "")]: {
					name: name.replace(".ts", ""),
					file: `./src/hooks/${hook}`,
				},
			};
		})
		.reduce((a, b) => ({ ...a, ...b }), {});

	const pageExamples = (await fs.readdir("./src/routes/guide", { recursive: true }))
		.filter((file) => file.startsWith("use") && file.endsWith("code-snippet.js"))
		.map((file) => {
			const [name] = file.split("/");

			return {
				file: `./src/routes/guide/${file}`,
				hook: hookFiles[name],
			};
		});

	for (const { hook, file } of pageExamples) {
		const hookContent = await fs.readFile(hook.file, { encoding: "utf-8" });
		const pageContent = await fs.readFile(file, { encoding: "utf-8" });

		// console.log("AA", pageContent.match(/export const sourceCode = `[^\\`]*`;/gim));
		const newContent = hookContent
			.replaceAll(/\$\{([^}]+)\}/gi, "\\${$1}")
			.replaceAll("`", "\\`")
			.replaceAll('from "@/hooks";', 'from "@dimaslz/svelteuse"')
			.trim();

		let sourceCodeValue = pageContent.replace(
			/export const sourceCode = `[^]*`;/gim,
			`export const sourceCode = \`\n${newContent}\n\`;\n`,
		);
		await fs.writeFile(file, sourceCodeValue, { encoding: "utf-8" });
	}
})();
