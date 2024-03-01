import { get } from "svelte/store";

import { useState } from "@/hooks";

describe("Hooks - useState", () => {
	describe("set number", () => {
		test("by number", () => {
			const [value, setValue] = useState<number>();

			expect(get(value)).toBeNull();
			setValue(999);
			expect(get(value)).toBe(999);
		});

		test("by funciton", () => {
			const [value, setValue] = useState<number>();

			expect(get(value)).toBeNull();
			setValue(() => 999);
			expect(get(value)).toBe(999);
		});
	});

	describe("set text", () => {
		test("by string", () => {
			const [value, setValue] = useState<string>();
			expect(get(value)).toBeNull();

			setValue("hello world");
			expect(get(value)).toBe("hello world");
		});

		test("by function", () => {
			const [value, setValue] = useState<string>();

			setValue(() => "hello world");
			expect(get(value)).toBe("hello world");
		});
	});

	describe("set object", () => {
		test("by object", () => {
			type TObj = {
				key: string;
				value: string;
			};
			const [value, setValue] = useState<TObj>();

			setValue({ key: "foo", value: "bar" });

			expect(get(value)).toStrictEqual({ key: "foo", value: "bar" });
		});

		test("by function", () => {
			type TObj = {
				key: string;
				value: string;
			};

			const [value, setValue] = useState<TObj>({
				key: "",
				value: "bar",
			});

			setValue((prev) => ({ ...prev, key: "foo" }));

			expect(get(value)).toStrictEqual({ key: "foo", value: "bar" });
		});
	});
});
