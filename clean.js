import fs from "fs/promises";

(async () => {
	const files = await fs.readdir("./publish/dist", { recursive: true });
	for (const file of files) {
		if (file.endsWith(".test.d.ts") || file.endsWith(".test.js")) {
			await fs.unlink(`./publish/dist/${file}`);
		}
		if (file.endsWith(".svelte.d.ts") || file.endsWith(".svelte")) {
			await fs.unlink(`./publish/dist/${file}`);
		}
	}
})();
