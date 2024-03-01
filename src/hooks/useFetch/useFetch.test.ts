import { useFetch } from ".";

const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

describe("Hooks - useFetch", () => {
	beforeEach(() => {
		mockFetch.mockClear();
	});

	test("shoud fetch data", () => {
		useFetch("http://localhost", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"custom-header": "custom header value",
			},
			body: JSON.stringify({ key: "value" }),
		});

		expect(mockFetch).toBeCalledWith("http://localhost", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"custom-header": "custom header value",
			},
			body: JSON.stringify({ key: "value" }),
		});
	});
});
