export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useObjectState } from '@dimaslz/svelteuse';

  const { subscribe, setState } = useObjectState({
    team: 'Utah Jazz',
    wins: 2138,
    losses: 1789,
    championships: 0
  });

  let stats: typeof initial;
  subscribe(value => (stats = value));

  const addWin = () => setState(s => ({ wins: s.wins + 1 }));
  const addLoss = () => setState({ losses: stats.losses + 1 });
  const reset = () => setState({
    team: 'Utah Jazz',
    wins: 2138,
    losses: 1789,
    championships: 0
  });
</script>

<!-- html -->
<button on:click={addWin}>Add Win</button>
<button on:click={addLoss}>Add Loss</button>
<button on:click={reset}>Reset</button>

<pre>{JSON.stringify(stats, null, 2)}</pre>
`;

export const sourceCode = `
  import { writable } from 'svelte/store';

  export function useObjectState<T extends object>(initial: T) {
    const store = writable<T>(initial);

    function setState(
      update: Partial<T> | ((prev: T) => Partial<T>)
    ) {
      store.update(prev => {
        const patch = typeof update === 'function'
          ? update(prev)
          : update;
        return { ...prev, ...patch };
      });
    }

    return {
      subscribe: store.subscribe,
      setState
    };
  }
`;
