<script lang="ts">
  import { useIntersectionObserver } from './useIntersectionObserver';

  export let callback: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void;

  const { action } = useIntersectionObserver({
    threshold: 0.5,
    freezeOnceVisible: true,
    onChange: callback,
  });
</script>

<div use:action data-testid="observed">Observed element</div>