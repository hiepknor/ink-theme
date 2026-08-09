import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    let active = true;
    const update = (next: boolean) => { if (active) setReduced(next); };

    try {
      const result = AccessibilityInfo.isReduceMotionEnabled?.();
      if (result && typeof result.then === 'function') result.then(update).catch(() => undefined);
    } catch {
      // Older hosts can expose AccessibilityInfo without the native method.
    }

    let subscription: { remove?: () => void } | undefined;
    try {
      subscription = AccessibilityInfo.addEventListener?.('reduceMotionChanged', update);
    } catch {
      // Keep the motion-safe default when the host cannot subscribe.
    }

    return () => {
      active = false;
      try { subscription?.remove?.(); } catch { /* Host subscription already closed. */ }
    };
  }, []);

  return reduced;
}
