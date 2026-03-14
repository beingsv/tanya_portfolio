import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SkillsSection from '../../components/SkillsSection/SkillsSection';

// Mock useInView to always return isInView: true
vi.mock('../../hooks/useInView', () => ({
  default: () => ({
    ref: { current: null },
    isInView: true,
  }),
}));

describe('SkillsSection', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the skills section with heading', () => {
    render(<SkillsSection />);
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByTestId('skills-section')).toBeInTheDocument();
  });

  it('renders all skill categories', () => {
    render(<SkillsSection />);
    expect(screen.getByTestId('skill-category-Programming Languages')).toBeInTheDocument();
    expect(screen.getByTestId('skill-category-Machine Learning')).toBeInTheDocument();
    expect(screen.getByTestId('skill-category-Data & Visualization')).toBeInTheDocument();
    expect(screen.getByTestId('skill-category-Research Tools')).toBeInTheDocument();
  });

  it('renders category names as headings', () => {
    render(<SkillsSection />);
    expect(screen.getByText('Programming Languages')).toBeInTheDocument();
    expect(screen.getByText('Machine Learning')).toBeInTheDocument();
    expect(screen.getByText('Data & Visualization')).toBeInTheDocument();
    expect(screen.getByText('Research Tools')).toBeInTheDocument();
  });

  it('renders individual skill items within categories', () => {
    render(<SkillsSection />);
    expect(screen.getByTestId('skill-item-Python')).toBeInTheDocument();
    expect(screen.getByTestId('skill-item-TypeScript')).toBeInTheDocument();
    expect(screen.getByTestId('skill-item-PyTorch')).toBeInTheDocument();
    expect(screen.getByTestId('skill-item-LaTeX')).toBeInTheDocument();
  });

  it('applies staggered transition-delay to skill items', () => {
    render(<SkillsSection />);
    const python = screen.getByTestId('skill-item-Python');
    const typescript = screen.getByTestId('skill-item-TypeScript');
    const r = screen.getByTestId('skill-item-R');

    expect(python.style.transitionDelay).toBe('0ms');
    expect(typescript.style.transitionDelay).toBe('100ms');
    expect(r.style.transitionDelay).toBe('200ms');
  });

  it('renders a visual category indicator (dot) for each category', () => {
    const { container } = render(<SkillsSection />);
    const dots = container.querySelectorAll('[aria-hidden="true"]');
    expect(dots.length).toBe(4);
  });

  it('renders skills in list items within their category', () => {
    render(<SkillsSection />);
    // Verify skills appear as list items
    const plCategory = screen.getByTestId('skill-category-Programming Languages');
    const items = plCategory.querySelectorAll('li');
    expect(items.length).toBe(5);
    expect(items[0].textContent).toBe('Python');
    expect(items[4].textContent).toBe('C++');
  });
});
