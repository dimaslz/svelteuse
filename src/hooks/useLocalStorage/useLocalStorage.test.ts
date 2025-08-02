import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { get } from "svelte/store";

import { useLocalStorage } from "@/hooks";

import UseLocalStorage from "./useLocalStorage.svelte";

describe("Hooks - useLocalStorage", () => {
	test("should store correctly", () => {
		const initialData = "my stored data";
		const { store, update, reset, clear } = useLocalStorage("test-key", initialData);

		expect(window.localStorage.getItem("test-key")).toBe(JSON.stringify(initialData));
		expect(get(store)).toBe(initialData);

		update("new data");

		expect(window.localStorage.getItem("test-key")).toBe('"\\"new data\\""');
		expect(get(store)).toBe('"new data"');

		reset();

		expect(window.localStorage.getItem("test-key")).toBe('"\\"my stored data\\""');

		clear();

		expect(window.localStorage.getItem("test-key")).toBe(null);
	});

	test("on component", async () => {
		const user = userEvent.setup();

		render(UseLocalStorage);

		const updateBtn = screen.getByText("update state");
		const resetBtn = screen.getByText("reset state");
		const clearBtn = screen.getByText("clear state");

		screen.getByText(/value is true/i);

		await user.click(updateBtn);

		screen.getByText(/value is false/i);

		await user.click(resetBtn);

		screen.getByText(/value is true/i);

		await user.click(clearBtn);

		screen.getByText(/value is null/i);
	});
});
