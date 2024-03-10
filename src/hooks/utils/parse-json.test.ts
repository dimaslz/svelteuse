export function parseJSON<T>(value: string | null | undefined): T | undefined {
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

describe("Utils - parseJSON", () => {
	test("parse JSON", () => {
		const result = parseJSON(JSON.stringify({ key: "value" }));

		expect(result).toBe(JSON.stringify({ key: "value" }));
	});

	test("parse 'true'", () => {
		const result = parseJSON("true");

		expect(result).toBe(true);
	});

	test("parse 'false'", () => {
		const result = parseJSON("false");

		expect(result).toBe(false);
	});

	test("parse undefined", () => {
		const result = parseJSON(undefined);

		expect(result).toBe(undefined);
	});

	test("parse null", () => {
		const result = parseJSON(null);

		expect(result).toBe(undefined);
	});
});
