export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useAsyncState } from '@dimaslz/svelteuse';

  const { state: user, isLoading, isReady, error, execute } = useAsyncState(
    () => fetch('https://jsonplaceholder.typicode.com/todos/1').then(r => r.json()),
    { id: null, title: '', completed: false } as { id: number; title: string; completed: boolean },
    { immediate: false }
  );

  function loadUser() {
    execute().catch(console.error);
  }
</script>

<!-- html -->
<button on:click={loadUser} disabled={$isLoading}>Load Todo</button>

{#if $isLoading}
  <p>Loading...</p>
{:else if $error}
  <p style="color: red">Error: {$error.message || String($error)}</p>
{:else if $isReady}
  <div>
    <h3>Todo #{$user.id}</h3>
    <p>{$user.title} — { $user.completed ? '✅' : '❌' }</p>
  </div>
{/if}
`;

export const sourceCode = `
import { writable, type Writable } from 'svelte/store';

export function useAsyncState<T>(
  fn: () => Promise<T>,
  initialState: T,
  options?: {
    immediate?: boolean;
    delay?: number;
    resetOnExecute?: boolean;
    onError?: (e: unknown) => void;
    onSuccess?: (data: T) => void;
  }
) {
  const { immediate = true, delay = 0, resetOnExecute = true, onError, onSuccess } = options || {};

  const state: Writable<T> = writable(initialState);
  const isLoading = writable(false);
  const isReady = writable(false);
  const error = writable<unknown>(null);

  async function execute() {
    if (resetOnExecute) state.set(initialState);
    isLoading.set(true);
    error.set(null);
    try {
      if (delay) await new Promise(res => setTimeout(res, delay));
      const data = await fn();
      state.set(data);
      isReady.set(true);
      onSuccess?.(data);
      return data;
    } catch (e) {
      error.set(e);
      onError?.(e);
      throw e;
    } finally {
      isLoading.set(false);
    }
  }

  if (immediate) {
    execute().catch(() => {});
  }

  return { state, isLoading, isReady, error, execute };
}
`;
