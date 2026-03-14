import { useRef, useState, useEffect, useCallback } from 'react';

interface UseInViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

interface UseInViewReturn {
  ref: React.RefObject<HTMLElement>;
  isInView: boolean;
}

function useInView(options?: UseInViewOptions): UseInViewReturn {
  const { threshold = 0.1, triggerOnce = true } = options ?? {};
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(() => {
    // Fallback: if IntersectionObserver is not supported, default to true
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return true;
    }
    // If user prefers reduced motion, return true immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true;
    }
    return false;
  });

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      }
    },
    [triggerOnce],
  );

  useEffect(() => {
    // Skip observer if IntersectionObserver is not supported
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    // Skip observer if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersect, { threshold });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, handleIntersect]);

  return { ref, isInView };
}

export default useInView;
