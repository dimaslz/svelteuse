import { fireEvent, render } from "@testing-library/svelte";

import UseClickAnyWhere from "./useClickAnyWhere.svelte";

vi.mock("esm-env", async (importOriginal) => {
	const actual: any = await importOriginal();

	return {
		...actual,
		BROWSER: true,
	};
});

describe("Hooks - useClickAnyWhere", () => {
	test("should excecute the callback", async () => {
		const onClickFn = vi.fn();

		render(UseClickAnyWhere, {
			props: { onClick: onClickFn },
		});

		await fireEvent.click(document);

		expect(onClickFn).toBeCalled();
	});

	test("should NOT excecute the callback after unmount", async () => {
		const onClickFn = vi.fn();

		const { unmount } = render(UseClickAnyWhere, {
			props: { onClick: onClickFn },
		});

		await unmount();
		await fireEvent.click(document);

		expect(onClickFn).not.toBeCalled();
	});
});
