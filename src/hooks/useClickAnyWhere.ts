import { useEventListener } from ".";

type Handler = (event: MouseEvent) => void;

export function useClickAnyWhere(handler: Handler): void {
	useEventListener("click", (event: MouseEvent) => {
		handler(event);
	});
}
