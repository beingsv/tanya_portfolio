import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Animation constraints unit tests
 * Validates: Requirements 10.2, 10.3, 10.4
 *
 * These tests parse the CSS custom properties from src/index.css
 * to verify animation tokens meet the design constraints.
 */

const cssContent = fs.readFileSync(
  path.resolve(__dirname, '../../index.css'),
  'utf-8',
);

describe('Animation constraints (Requirements 10.2, 10.3, 10.4)', () => {
  it('animation duration is under 600ms (Req 10.2)', () => {
    // Match --animation-duration in the :root block (not inside @media)
    const rootMatch = cssContent.match(
      /:root\s*\{[^}]*--animation-duration:\s*(\d+)ms/,
    );
    expect(rootMatch).not.toBeNull();
    const duration = parseInt(rootMatch![1], 10);
    expect(duration).toBeLessThan(600);
  });

  it('easing function is not "linear" (Req 10.3)', () => {
    const easingMatch = cssContent.match(
      /:root\s*\{[^}]*--animation-easing:\s*([^;]+)/,
    );
    expect(easingMatch).not.toBeNull();
    const easing = easingMatch![1].trim();
    expect(easing).not.toBe('linear');
  });

  it('prefers-reduced-motion media query sets duration to 0ms (Req 10.4)', () => {
    // Find the @media (prefers-reduced-motion: reduce) block
    const reducedMotionMatch = cssContent.match(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[^}]*--animation-duration:\s*(\d+)ms/,
    );
    expect(reducedMotionMatch).not.toBeNull();
    const reducedDuration = parseInt(reducedMotionMatch![1], 10);
    expect(reducedDuration).toBe(0);
  });
});
