export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useMouse } from "@dimaslz/svelteuse";

	const [mouse, mouseTracker] = useMouse();
</script>

<!-- html -->
<div>
  <div
    use:mouseTracker
    class={["size-56 border p-4 text-black", $mouse.isOutside ? "bg-red-200" : 'bg-green-200'].join(" ")}
  >
    <p>Mouse X: {$mouse.x}</p>
    <p>Mouse Y: {$mouse.y}</p>
    <p>Element X: {$mouse.elementX}</p>
    <p>Element Y: {$mouse.elementY}</p>
    <p>Element Width: {$mouse.elementWidth}</p>
    <p>Element Height: {$mouse.elementHeight}</p>
    <p>isOutside: {$mouse.isOutside}</p>
  </div>
</div>
`;

export const sourceCode = `import { writable } from 'svelte/store';
import type { Action } from 'svelte/action';

export const useMouse = () => {
	let newState = {
		x: 0,
		y: 0,
		elementX: 0,
		elementY: 0,
		elementPositionX: 0,
		elementPositionY: 0,
		elementWidth: 0,
		elementHeight: 0,
		isOutside: false,
	};

  const state = writable({
    ...newState
  });

  let node: HTMLElement | null = null;

  const handleMouseMove = (event: MouseEvent) => {
		newState = {
			...newState,
			x: event.pageX,
			y: event.pageY,
		};

    if (node) {
      const rect = node.getBoundingClientRect();
      const elementPositionX = rect.left + window.scrollX;
      const elementPositionY = rect.top + window.scrollY;
      const elementX = event.pageX - elementPositionX;
			const elementY = event.pageY - elementPositionY;
      const elementWidth = rect.width;
			const elementHeight = rect.height;

      newState.elementX = elementX;
      newState.elementY = elementY;
      newState.elementPositionX = elementPositionX;
      newState.elementPositionY = elementPositionY;
      newState.elementWidth = elementWidth;
			newState.elementHeight = elementHeight;
			newState.isOutside = elementWidth === 0 || elementHeight === 0
				|| elementX < 0 || elementY < 0
				|| elementX > elementWidth || elementY > elementHeight
    }

    state.update(prev => ({ ...prev, ...newState }));
  };

	const mouseTracker: Action<HTMLElement> = (_node) => {
		node = _node;
		const rect = node.getBoundingClientRect();
		const elementWidth = rect.width;
		const elementHeight = rect.height;

		newState.elementWidth = elementWidth;
		newState.elementHeight = elementHeight;

		state.update(prev => ({ ...prev, ...newState }));

    document.addEventListener('mousemove', handleMouseMove);

    return {
      destroy() {
        document.removeEventListener('mousemove', handleMouseMove);
      }
    };
  };

  return [state, mouseTracker] as const;
};
`;
