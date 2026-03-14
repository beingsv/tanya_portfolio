# Implementation Plan: Research Scholar Portfolio

## Overview

Build a single-page React portfolio for a research scholar using Vite + React + TypeScript with CSS Modules. Implementation proceeds incrementally: project scaffolding → types/data → hooks → components → styling → integration → testing.

## Tasks

- [x] 1. Project setup and configuration
  - [x] 1.1 Initialize Vite + React + TypeScript project
    - Run `npm create vite@latest . -- --template react-ts` (or scaffold manually)
    - Install dependencies: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `fast-check`
    - Configure `vitest.config.ts` with jsdom environment and setup file
    - Add Google Fonts imports for Playfair Display and Inter
    - _Requirements: 9.3, 12.3_

  - [x] 1.2 Create global styles and CSS custom properties
    - Define the five-color palette, typography, animation tokens, and spacing in `src/index.css`
    - Add CSS reset and `prefers-reduced-motion` media query that sets `--animation-duration: 0ms`
    - Define responsive breakpoint media queries (mobile-first)
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 10.2, 10.3, 10.4, 11.1_

- [x] 2. Define TypeScript interfaces and static data
  - [x] 2.1 Create type definitions in `src/types/index.ts`
    - Define all interfaces: `Scholar`, `EducationMilestone`, `ResearchItem`, `SkillCategory`, `InterestArea`, `GalleryPhoto`, `ContactInfo`, `SocialLink`, `SectionLink`
    - _Requirements: 1.1, 3.1, 4.1, 5.1, 6.1, 7.1, 8.1_

  - [x] 2.2 Create static data files in `src/data/`
    - Create `scholar.ts`, `education.ts`, `research.ts`, `skills.ts`, `interests.ts`, `gallery.ts`, `contact.ts`
    - Populate with placeholder content that matches the type definitions
    - Education data must be sortable by year for reverse chronological display
    - _Requirements: 1.1, 3.1, 3.2, 4.1, 5.1, 6.1, 7.1, 8.1, 12.1_

- [x] 3. Implement custom hooks
  - [x] 3.1 Implement `useInView` hook in `src/hooks/useInView.ts`
    - Use Intersection Observer API with configurable `threshold` and `triggerOnce` options
    - When `triggerOnce` is true, disconnect observer after first intersection
    - Check `prefers-reduced-motion: reduce` — if active, return `isInView: true` immediately
    - Fallback to `isInView: true` if IntersectionObserver is not supported
    - _Requirements: 10.1, 10.4_

  - [ ]* 3.2 Write property tests for useInView
    - **Property 16: useInView triggerOnce prevents re-triggering**
    - **Property 17: Reduced motion preference disables animations**
    - **Validates: Requirements 10.1, 10.4**

  - [x] 3.3 Implement `useActiveSection` hook in `src/hooks/useActiveSection.ts`
    - Use Intersection Observer on all section elements by ID
    - Return the section ID with the highest intersection ratio
    - _Requirements: 2.4_

  - [ ]* 3.4 Write property test for useActiveSection
    - **Property 3: Active section detection returns highest-intersection section**
    - **Validates: Requirements 2.4**

  - [x] 3.5 Implement `useCarousel` hook in `src/hooks/useCarousel.ts`
    - Implement `next()`, `prev()`, `goTo()` with modular arithmetic for looping
    - Auto-advance via `setInterval` with configurable interval (default 4000ms)
    - `pause()` and `resume()` to control auto-advance
    - Touch handlers: track touchStart/touchEnd X, 50px swipe threshold triggers next/prev
    - Any manual interaction (next, prev, goTo, swipe) calls pause automatically
    - _Requirements: 7.2, 7.3, 7.4, 7.5, 7.6_

  - [ ]* 3.6 Write property tests for useCarousel
    - **Property 11: Swipe gesture triggers carousel navigation**
    - **Property 12: Manual carousel interaction pauses auto-advance**
    - **Property 13: Carousel loops via modular arithmetic**
    - **Validates: Requirements 7.3, 7.5, 7.6**

- [x] 4. Checkpoint - Hooks complete
  - Ensure all tests pass, ask the user if questions arise.


- [x] 5. Implement NavigationBar and HeroSection components
  - [x] 5.1 Implement `NavigationBar` component
    - Render `<nav>` with `position: sticky; top: 0`
    - Render links from `SectionLink[]` prop in order
    - Smooth-scroll on click via `scrollIntoView({ behavior: 'smooth' })`
    - Highlight active section link using `useActiveSection`
    - Hamburger menu with slide-out drawer on mobile (< 768px)
    - Create `NavigationBar.module.css` with responsive styles
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 11.2, 13.2_

  - [ ]* 5.2 Write property test for NavigationBar
    - **Property 2: NavigationBar renders all section links in order**
    - **Validates: Requirements 2.1, 13.2**

  - [x] 5.3 Implement `HeroSection` component
    - Render scholar's full name, title, affiliation, tagline, and profile photo
    - Use `useInView` with `triggerOnce: true` for fade-in animation
    - Create `HeroSection.module.css` with animation classes and responsive styles
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ]* 5.4 Write property test for HeroSection
    - **Property 1: Hero section renders all scholar fields**
    - **Validates: Requirements 1.1, 1.3** 

- [x] 6. Implement EducationTimeline and ResearchSection components
  - [x] 6.1 Implement `EducationTimeline` component
    - Sort milestones by endYear (or startYear if endYear is null) descending
    - Render institution, degree, field, and year range for each entry
    - Two-column vertical timeline on desktop, single-column on mobile
    - Each entry uses `useInView` for entrance animation
    - Create `EducationTimeline.module.css`
    - _Requirements: 3.1, 3.2, 3.3, 11.4_

  - [ ]* 6.2 Write property tests for EducationTimeline
    - **Property 4: Education milestones rendered in reverse chronological order**
    - **Property 5: Education milestone renders all required fields**
    - **Validates: Requirements 3.1, 3.2**

  - [x] 6.3 Implement `ResearchSection` component
    - Render research cards with title, description, venue, and external link
    - External links use `target="_blank"` and `rel="noopener noreferrer"`
    - Each card uses `useInView` for entrance animation
    - Create `ResearchSection.module.css`
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [ ]* 6.4 Write property test for ResearchSection
    - **Property 6: Research item renders all fields with valid external link**
    - **Validates: Requirements 4.1, 4.2**

- [x] 7. Implement SkillsSection and InterestSection components
  - [x] 7.1 Implement `SkillsSection` component
    - Group skills by category with visual category indicator
    - Use `useInView` with staggered `transition-delay` per item (index * delayStep)
    - Create `SkillsSection.module.css`
    - _Requirements: 5.1, 5.2, 5.3_

  - [ ]* 7.2 Write property tests for SkillsSection
    - **Property 7: Skills are grouped by category**
    - **Property 8: Staggered animation delay is proportional to item index**
    - **Validates: Requirements 5.1, 5.3**

  - [x] 7.3 Implement `InterestSection` component
    - Render each interest as a distinct card with label and summary
    - Use `useInView` for entrance animation
    - Create `InterestSection.module.css`
    - _Requirements: 6.1, 6.2, 6.3_

  - [ ]* 7.4 Write property test for InterestSection
    - **Property 9: Interest area renders label and summary**
    - **Validates: Requirements 6.1**

- [x] 8. Checkpoint - Core sections complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Implement PhotoGallery and ContactFooter components
  - [x] 9.1 Implement `PhotoGallery` component
    - Use `useCarousel` hook for carousel state and behavior
    - Render left/right navigation arrow controls
    - Attach touch event handlers from useCarousel for swipe support
    - Non-visible images use `loading="lazy"` attribute
    - Adjust visible photo count by viewport: 1 (mobile), 2 (tablet), 3 (desktop)
    - Create `PhotoGallery.module.css`
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 11.3, 12.2_

  - [ ]* 9.2 Write property tests for PhotoGallery
    - **Property 10: Carousel visible count matches viewport breakpoint**
    - **Property 18: Non-visible gallery images are lazy-loaded**
    - **Validates: Requirements 7.1, 11.3, 12.2**

  - [x] 9.3 Implement `ContactFooter` component
    - Render email and social/academic links with `target="_blank"` and `rel="noopener noreferrer"`
    - Display copyright notice with `new Date().getFullYear()`
    - Create `ContactFooter.module.css`
    - _Requirements: 8.1, 8.2, 8.3_

  - [ ]* 9.4 Write property test for ContactFooter
    - **Property 14: Contact footer renders all contact information**
    - **Validates: Requirements 8.1, 8.2**

- [x] 10. Wire up App component and section ordering
  - [x] 10.1 Implement `App.tsx` with all sections in correct order
    - Render NavigationBar with SECTION_ORDER constant
    - Render all sections inside `<main>` in order: Hero, Education, Research, Skills, Interests, PhotoGallery, ContactFooter
    - Each section wrapped in a `<section>` element with the corresponding `id`
    - Create `App.module.css` with section spacing (ample whitespace per Req 9.2)
    - _Requirements: 13.1, 13.2, 9.2_

  - [ ]* 10.2 Write unit tests for section ordering
    - Verify DOM order matches: Hero, Education, Research, Skills, Interests, PhotoGallery, ContactFooter
    - Verify NavigationBar links match section order
    - _Requirements: 13.1, 13.2_

- [x] 11. Theme and accessibility validation
  - [ ]* 11.1 Write property test for color theme contrast
    - **Property 15: Color theme contrast ratio meets accessibility minimum**
    - **Validates: Requirements 9.4**

  - [ ]* 11.2 Write unit tests for animation constraints
    - Verify animation duration CSS value is under 600ms
    - Verify easing function is not "linear"
    - Verify `prefers-reduced-motion` media query sets duration to 0ms
    - _Requirements: 10.2, 10.3, 10.4_

- [ ] 12. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- All components read from static data files — no API integration needed
