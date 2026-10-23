import { useEffect, useState } from 'react';

/**
 * Flips to true once the page has loaded and the browser is idle, so decorative work
 * (canvas animations, smooth scroll) doesn't compete with the first paint.
 */
export function useIdleReady(timeout = 1500) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let handle = 0;

    function schedule() {
      if (typeof window.requestIdleCallback === 'function') {
        handle = window.requestIdleCallback(() => !cancelled && setReady(true), { timeout });
      } else {
        handle = window.setTimeout(() => !cancelled && setReady(true), 200);
      }
    }

    if (document.readyState === 'complete') {
      schedule();
    } else {
      window.addEventListener('load', schedule, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', schedule);
      if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, [timeout]);

  return ready;
}
