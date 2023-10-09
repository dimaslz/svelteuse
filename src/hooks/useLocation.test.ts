import { get } from "svelte/store";

import { useLocation } from "@/hooks";
describe("Hook - useLocation", () => {
	test("should get /home as pathname", () => {
		const location = useLocation();

		expect(get(location).pathname).toBe("/home");
	});
});
