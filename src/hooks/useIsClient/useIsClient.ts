import { isClient } from "@/utils/is-client";

export function useIsClient() {
	return isClient();
}