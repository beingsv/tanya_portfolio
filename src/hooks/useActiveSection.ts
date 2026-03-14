import { useState, useEffect, useRef } from 'react';

/**
 * Tracks which section is currently most visible in the viewport.
 * Uses Intersection Observer on all section elements by ID.
 * Returns the ID of the section with the highest intersection ratio.
 *
 * Validates: Requirements 2.4
 */
function useActiveSection(sectionIds: string[]): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const ratiosRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    // If IntersectionObserver is not supported, fall back to first section
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      if (sectionIds.length > 0) {
        setActiveSection(sectionIds[0]);
      }
      return;
    }

    const ratios = ratiosRef.current;
    ratios.clear();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }

        let highestRatio = 0;
        let highestId: string | null = null;

        for (const [id, ratio] of ratios) {
          if (ratio > highestRatio) {
            highestRatio = ratio;
            highestId = id;
          }
        }

        setActiveSection(highestId);
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      },
    );

    const elements: Element[] = [];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
}

export default useActiveSection;
