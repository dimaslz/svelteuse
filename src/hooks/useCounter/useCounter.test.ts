import { get } from "svelte/store";

import { useCounter } from "@/hooks";

describe("Hooks - useCounter", () => {
	test("value 0 by default", () => {
		const { count } = useCounter(0);

		expect(get(count)).toBe(0);
	});

	test("increment value", () => {
		const { count, increment } = useCounter(0);

		increment();
		expect(get(count)).toBe(1);
	});

	test("decrement value", () => {
		const { count, decrement } = useCounter(0);

		decrement();
		expect(get(count)).toBe(-1);
	});

	test("increment value to 3", () => {
		const { count, increment } = useCounter(0);

		increment(3);
		expect(get(count)).toBe(3);
	});

	test("decrement value to 3", () => {
		const { count, decrement } = useCounter(0);

		decrement(3);
		expect(get(count)).toBe(-3);
	});

	test("reset value", () => {
		const { count, increment, reset } = useCounter(0);

		increment(3);
		reset();
		expect(get(count)).toBe(0);
	});

	test("set specific value", () => {
		const { count, setCount } = useCounter(0);

		setCount(100);

		expect(get(count)).toBe(100);
	});

	test("on MouseEvent, should increment 1 by default", () => {
		const { count, increment } = useCounter(0);

		const event = new MouseEvent("click", {
			bubbles: true,
			cancelable: true,
		});

		increment(event);

		expect(get(count)).toBe(1);
	});

	test("on MouseEvent, should decrement 1 by default", () => {
		const { count, decrement } = useCounter(0);

		const event = new MouseEvent("click", {
			bubbles: true,
			cancelable: true,
		});

		decrement(event);

		expect(get(count)).toBe(-1);
	});
});
