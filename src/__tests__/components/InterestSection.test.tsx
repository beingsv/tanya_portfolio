import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import InterestSection from '../../components/InterestSection/InterestSection';

// Mock useInView to always return isInView: true
vi.mock('../../hooks/useInView', () => ({
  default: () => ({
    ref: { current: null },
    isInView: true,
  }),
}));

describe('InterestSection', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the section with heading', () => {
    render(<InterestSection />);
    expect(screen.getByText('Areas of Interest')).toBeInTheDocument();
    expect(screen.getByTestId('interest-section')).toBeInTheDocument();
  });

  it('renders all four interest cards', () => {
    render(<InterestSection />);
    expect(screen.getByTestId('interest-card-int-1')).toBeInTheDocument();
    expect(screen.getByTestId('interest-card-int-2')).toBeInTheDocument();
    expect(screen.getByTestId('interest-card-int-3')).toBeInTheDocument();
    expect(screen.getByTestId('interest-card-int-4')).toBeInTheDocument();
  });

  it('renders each card with its label and summary', () => {
    render(<InterestSection />);
    expect(screen.getByText('Explainable AI')).toBeInTheDocument();
    expect(screen.getByText(/Building machine learning models whose decisions/)).toBeInTheDocument();

    expect(screen.getByText('Computational Neuroscience')).toBeInTheDocument();
    expect(screen.getByText(/Modeling neural circuits/)).toBeInTheDocument();

    expect(screen.getByText('AI for Healthcare')).toBeInTheDocument();
    expect(screen.getByText(/Leveraging deep learning and causal inference/)).toBeInTheDocument();

    expect(screen.getByText('Privacy-Preserving ML')).toBeInTheDocument();
    expect(screen.getByText(/Developing federated and differential privacy/)).toBeInTheDocument();
  });

  it('renders labels as h3 headings inside cards', () => {
    render(<InterestSection />);
    const card = screen.getByTestId('interest-card-int-1');
    const heading = card.querySelector('h3');
    expect(heading).not.toBeNull();
    expect(heading!.textContent).toBe('Explainable AI');
  });

  it('returns null when interests data is empty', async () => {
    // Mock the interests data to be empty before importing the component
    vi.doMock('../../data/interests', () => ({
      interests: [],
    }));

    // Reset module registry so the component picks up the mocked data
    vi.resetModules();

    const { default: EmptyInterestSection } = await import(
      '../../components/InterestSection/InterestSection'
    );

    const { container } = render(<EmptyInterestSection />);
    expect(container.innerHTML).toBe('');
  });
});
