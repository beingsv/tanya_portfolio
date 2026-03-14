import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

/**
 * Feature: research-scholar-portfolio
 * Property 15: Color theme contrast ratio meets accessibility minimum
 * Validates: Requirements 9.4
 */

/**
 * Compute relative luminance of an sRGB color per WCAG 2.0.
 * Each channel value is 0–255.
 */
function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Compute WCAG contrast ratio between two colors.
 */
function contrastRatio(
  fg: [number, number, number],
  bg: [number, number, number],
): number {
  const l1 = relativeLuminance(...fg);
  const l2 = relativeLuminance(...bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Parse a hex color string (#RRGGBB) into [r, g, b].
 */
function parseHex(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

// Color pairs from src/index.css CSS custom properties
const COLOR_PAIRS: { name: string; fg: string; bg: string }[] = [
  {
    name: '--color-text on --color-surface (body text)',
    fg: '#2d3436', // --color-text
    bg: '#faf8f5', // --color-surface
  },
  {
    name: 'white on --color-primary (footer headings on dark bg)',
    fg: '#ffffff',
    bg: '#2d3436', // --color-primary
  },
  {
    name: '--color-primary on --color-secondary (text on warm bg)',
    fg: '#2d3436', // --color-primary
    bg: '#f0ebe3', // --color-secondary
  },
  {
    name: '--color-accent on --color-surface (accent text on light bg)',
    fg: '#7c6a56', // --color-accent
    bg: '#faf8f5', // --color-surface
  },
];

describe('Property 15: Color theme contrast ratio meets accessibility minimum', () => {
  it('all theme color pairs have contrast ratio >= 4.5:1', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...COLOR_PAIRS),
        (pair) => {
          const ratio = contrastRatio(parseHex(pair.fg), parseHex(pair.bg));
          expect(ratio).toBeGreaterThanOrEqual(4.5);
        },
      ),
      { numRuns: 100 },
    );
  });

  // Verify each pair individually for clear diagnostics
  COLOR_PAIRS.forEach((pair) => {
    it(`${pair.name} has contrast ratio >= 4.5:1`, () => {
      const ratio = contrastRatio(parseHex(pair.fg), parseHex(pair.bg));
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });
});
