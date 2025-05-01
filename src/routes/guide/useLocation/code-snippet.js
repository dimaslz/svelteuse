export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useLocation } from "@dimaslz/svelteuse";

	const location = useLocation();

	const onInput = (event: Event) => {
		const value = (event.target as HTMLInputElement).value;

		$location.hash = value;
		history.pushState($location.href, "", \`#\${value}\`);
		window.dispatchEvent(new HashChangeEvent("hashchange"))
	};
</script>

<!-- html -->
<div>
	<input
		value={$location.hash?.replace("#", "")} on:input={onInput}
		placeholder="write some #hash value..."
	/>

	<pre>{JSON.stringify($location, null, 2)}</pre>
</div>
`;

export const sourceCode = `
import { writable, get } from 'svelte/store';

import { useEventListener } from '@/hooks/useEventListener';
import type { ConfigurableWindow } from '@/types';
import { isClient } from '@/utils/is-client';

export const defaultWindow = isClient() ? window : undefined;

const WRITABLE_PROPERTIES = [
  'hash',
  'host',
  'hostname',
  'href',
  'pathname',
  'port',
  'protocol',
  'search',
] as const;

export interface BrowserLocationState {
  trigger: string;
  state?: any;
  length?: number;
  origin?: string;
  hash?: string;
  host?: string;
  hostname?: string;
  href?: string;
  pathname?: string;
  port?: string;
  protocol?: string;
  search?: string;
}

export function useLocation(options: ConfigurableWindow = {}) {
  const { window = defaultWindow } = options;

  const refs = WRITABLE_PROPERTIES.reduce((acc, key) => {
    acc[key] = writable<string | undefined>(window?.location?.[key]);
    return acc;
  }, {} as Record<typeof WRITABLE_PROPERTIES[number], ReturnType<typeof writable>>);

  const buildState = (trigger: string): BrowserLocationState => {
    const hash = window?.location.hash || "";
    const { origin } = window?.location || {};

    WRITABLE_PROPERTIES.filter((key) => WRITABLE_PROPERTIES.includes(key)).forEach((key) => {
      refs[key].set(window?.location?.[key]);
    });

    return {
      trigger,
      length: hash.length,
      origin,
      ...Object.fromEntries(
        WRITABLE_PROPERTIES.map((key) => [key, get(refs[key])])
      ),
    };
  };

  const state = writable<BrowserLocationState>(buildState('load'));

  if (window) {
    const updateState = (trigger: string) => {
      state.set(buildState(trigger));
    };

    useEventListener('popstate', () => updateState('popstate'), window, { passive: true });
    useEventListener('hashchange', () => updateState('hashchange'), window, { passive: true });

    // Watch each individual ref store for external changes and update location
    WRITABLE_PROPERTIES
      .forEach((key) => {
        refs[key].subscribe((value) => {
          if (!window?.location || window.location[key] === value) return;

          try {
            (window.location as any)[key] = value!;
          } catch (e) {
            // some location properties are read-only in some environments
          }
        });
      });
  }

  return state;
}

export type UseLocationReturn = ReturnType<typeof useLocation>;
`;
