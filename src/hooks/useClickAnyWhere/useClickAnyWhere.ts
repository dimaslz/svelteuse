import { useEventListener } from "..";

type Handler = (event: MouseEvent) => void;

export function useClickAnyWhere(handler: Handler): () => void {
	return useEventListener<MouseEvent>("click", (event) => {
		handler(event);
	});
}
