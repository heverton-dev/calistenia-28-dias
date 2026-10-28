import { useEffect, useRef } from 'react';

export function useWakeLock(enabled: boolean) {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    if (!enabled || typeof navigator === 'undefined' || !('wakeLock' in navigator)) {
      return;
    }

    let isMounted = true;

    async function requestWakeLock() {
      try {
        const sentinel = await navigator.wakeLock.request('screen');
        if (isMounted) {
          wakeLockRef.current = sentinel;
        } else {
          sentinel.release().catch(() => {});
        }
      } catch {
        // Ignora caso permissão não concedida
      }
    }

    requestWakeLock();

    return () => {
      isMounted = false;
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(() => {});
        wakeLockRef.current = null;
      }
    };
  }, [enabled]);
}
