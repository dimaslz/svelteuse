export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useScrollLock } from '@dimaslz/svelteuse';

  let modalOpen = false;
  const { isLocked, lock, unlock, set } = useScrollLock();

  $: set(modalOpen);
</script>

<!-- html -->
<button on:click={() => (modalOpen = true)}>Open Modal</button>

{#if modalOpen}
  <div
    class="fixed inset-0 bg-gray-950/50 flex items-center justify-center z-10"
  >
    <div
      class="bg-gray-600 my-2 mx-auto p-4 w-[300px] text-white"
    >
      <p>Modal is open!</p>
      <button
        on:click={(e) => {
          e.stopPropagation();
          modalOpen = false;
        }}
      >Close</button>
    </div>
  </div>
{/if}

{#if $isLocked}
  <p class="p-4">Body Scrolling is locked</p>
{/if}
`;

export const sourceCode = `
import { writable, type Writable } from 'svelte/store';

export function useScrollLock(
  target: HTMLElement | Window | Document | null = null,
  initial = false
) {

  target = typeof window === 'undefined' ? null : document.body;

  const isLocked: Writable<boolean> = writable(initial);
  let originalOverflow = '';

  const lock = () => {
    const el = getElement();
    if (!el) return;
    if (el instanceof HTMLBodyElement || el instanceof HTMLElement) {
      originalOverflow = el.style.overflow;
      el.style.overflow = 'hidden';
    } else if (el instanceof Document || el instanceof Window) {
      originalOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
    }
    isLocked.set(true);
  };

  const unlock = () => {
    const el = getElement();
    if (!el) return;
    if (el instanceof HTMLBodyElement || el instanceof HTMLElement) {
      el.style.overflow = originalOverflow;
    } else {
      document.documentElement.style.overflow = originalOverflow;
    }
    isLocked.set(false);
  };

  function getElement(): HTMLElement | Window | Document | null {
    if (typeof window === 'undefined') return null;

    if (target instanceof Window || target instanceof Document) return target;
    return target;
  }

  const set = (value: boolean) => (value ? lock() : unlock());

  if (initial) lock();

  return { isLocked, lock, unlock, set };
}
`;
