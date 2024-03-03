import { useSessionStorage } from "@/hooks";

describe("Hooks - useSessionStorage", () => {
	test("should store correctly", () => {
		const initialData = "my stored data";
		const { update, reset, clear } = useSessionStorage("test-key", initialData);

		expect(window.sessionStorage.getItem("test-key")).toBe(JSON.stringify(initialData));

		update("new data");

		expect(window.sessionStorage.getItem("test-key")).toBe(JSON.stringify("new data"));

		reset();

		expect(window.sessionStorage.getItem("test-key")).toBe(JSON.stringify(initialData));

		clear();

		expect(window.sessionStorage.getItem("test-key")).toBe(null);
	});
});
