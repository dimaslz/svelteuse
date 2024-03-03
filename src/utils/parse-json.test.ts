import { parseJSON } from "@/utils";

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
