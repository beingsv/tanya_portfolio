import { useState, useRef, useCallback, useEffect } from 'react';

interface UseCarouselOptions {
  totalItems: number;
  autoAdvanceMs?: number;
  visibleCount?: number;
}

interface UseCarouselReturn {
  currentIndex: number;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  pause: () => void;
  resume: () => void;
  handlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
  };
}

const SWIPE_THRESHOLD = 50;

function useCarousel(options: UseCarouselOptions): UseCarouselReturn {
  const { totalItems, autoAdvanceMs = 4000, visibleCount = 1 } = options;
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number>(0);
  const isPausedRef = useRef(false);

  const clearAutoAdvance = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoAdvance = useCallback(() => {
    clearAutoAdvance();
    if (totalItems <= visibleCount) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, autoAdvanceMs);
  }, [totalItems, autoAdvanceMs, visibleCount, clearAutoAdvance]);

  const pause = useCallback(() => {
    isPausedRef.current = true;
    clearAutoAdvance();
  }, [clearAutoAdvance]);

  const resume = useCallback(() => {
    isPausedRef.current = false;
    startAutoAdvance();
  }, [startAutoAdvance]);

  const next = useCallback(() => {
    if (totalItems <= 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalItems);
    pause();
  }, [totalItems, pause]);

  const prev = useCallback(() => {
    if (totalItems <= 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    pause();
  }, [totalItems, pause]);

  const goTo = useCallback(
    (index: number) => {
      if (totalItems <= 0) return;
      const normalized = ((index % totalItems) + totalItems) % totalItems;
      setCurrentIndex(normalized);
      pause();
    },
    [totalItems, pause],
  );

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX;

      if (Math.abs(diff) >= SWIPE_THRESHOLD) {
        if (diff > 0) {
          next();
        } else {
          prev();
        }
      }
    },
    [next, prev],
  );

  // Start auto-advance on mount, clean up on unmount
  useEffect(() => {
    if (!isPausedRef.current) {
      startAutoAdvance();
    }
    return clearAutoAdvance;
  }, [startAutoAdvance, clearAutoAdvance]);

  return {
    currentIndex,
    next,
    prev,
    goTo,
    pause,
    resume,
    handlers: {
      onTouchStart,
      onTouchEnd,
    },
  };
}

export default useCarousel;
