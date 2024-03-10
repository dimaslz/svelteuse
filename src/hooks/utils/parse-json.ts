export function parseJSON<T>(value: string | null): T | undefined {
	try {
		return value === "undefined"
			? undefined
			: typeof value === "string" && value !== "true" && value !== "false"
				? value
				: JSON.parse(value ?? "");
	} catch {
		console.log("parsing error on", { value });
		return undefined;
	}
}
