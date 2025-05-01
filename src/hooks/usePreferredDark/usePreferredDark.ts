import { useMediaQuery } from "@/hooks/useMediaQuery";

export function usePreferredDark() {
	const { matches } = useMediaQuery('(prefers-color-scheme: dark)');

	return matches;
}