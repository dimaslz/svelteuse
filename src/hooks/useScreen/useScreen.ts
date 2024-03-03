export function useScreen(): Partial<Screen> {
	const getScreen = (): Partial<Screen> => {
		if (typeof window !== "undefined" && window.screen) {
			return window.screen;
		}

		return {
			width: 0,
			height: 0,
		};
	};

	return getScreen();
}
