import { get } from "svelte/store";

import { type MapOrEntries, useMap } from "@/hooks";

describe("Hooks - useMap", () => {
	test("on add data", () => {
		const initialValues: MapOrEntries<string, string> = [["fooA", "barA"]];
		const { map, actions } = useMap(initialValues);

		actions.add("fooB", "barB");

		expect(get(map)).toEqual(
			new Map([
				["fooA", "barA"],
				["fooB", "barB"],
			]),
		);
	});

	test("on set data", () => {
		const initialValues: MapOrEntries<string, string> = [["fooA", "barA"]];
		const { map, actions } = useMap(initialValues);

		actions.set([
			["fooC", "barC"],
			["fooD", "barD"],
		]);

		expect(get(map)).toEqual(
			new Map([
				["fooC", "barC"],
				["fooD", "barD"],
			]),
		);
	});

	test("on remove data", () => {
		const initialValues: MapOrEntries<string, string> = [["fooA", "barA"]];
		const { map, actions } = useMap(initialValues);

		actions.remove("fooA");

		expect(get(map)).toEqual(new Map([]));
	});

	test("on reset data", () => {
		const initialValues: MapOrEntries<string, string> = [["fooA", "barA"]];
		const { map, actions } = useMap(initialValues);

		actions.reset();

		expect(get(map)).toEqual(new Map([]));
	});
});
