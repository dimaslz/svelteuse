import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";

import { useLocalStorage } from "@/hooks";

import UseLocalStorage from "./useLocalStorage.svelte";

describe("Hooks - useLocalStorage", () => {
	test("should store correctly", () => {
		const initialData = "my stored data";
		const { update, reset, clear } = useLocalStorage("test-key", initialData);

		expect(window.localStorage.getItem("test-key")).toBe(JSON.stringify(initialData));
		// expect(get(store)).toBe(initialData);

		update("new data");

		expect(window.localStorage.getItem("test-key")).toBe(JSON.stringify("new data"));
		// expect(get(store)).toBe("new data");

		reset();

		expect(window.localStorage.getItem("test-key")).toBe(JSON.stringify(initialData));

		clear();

		expect(window.localStorage.getItem("test-key")).toBe(null);
	});

	test.todo("on component", async () => {
		const user = userEvent.setup();

		render(UseLocalStorage);

		const updateBtn = screen.getByText("update state");
		const resetBtn = screen.getByText("reset state");
		const clearBtn = screen.getByText("clear state");

		screen.getByText(/value is true/i);

		// await fireEvent.click(updateBtn);
		await user.click(updateBtn);

		// screen.getByText(/value is false/i);
	});
});
