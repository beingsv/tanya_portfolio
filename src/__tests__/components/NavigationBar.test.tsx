import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import type { SectionLink } from '../../types';

// Mock useActiveSection
vi.mock('../../hooks/useActiveSection', () => ({
  default: vi.fn(() => null),
}));

import useActiveSection from '../../hooks/useActiveSection';

const mockSections: SectionLink[] = [
  { id: 'hero', label: 'Home' },
  { id: 'education', label: 'Education' },
  { id: 'research', label: 'Research' },
  { id: 'skills', label: 'Skills' },
  { id: 'interests', label: 'Interests' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
];

describe('NavigationBar', () => {
  beforeEach(() => {
    vi.mocked(useActiveSection).mockReturnValue(null);
  });

  it('renders a <nav> element', () => {
    render(<NavigationBar sections={mockSections} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders all section links in order', () => {
    render(<NavigationBar sections={mockSections} />);
    // Desktop links — get all buttons with section labels
    const buttons = screen.getAllByRole('button').filter(
      (btn) => mockSections.some((s) => s.label === btn.textContent),
    );
    // Each section appears twice (desktop + drawer), check desktop set order
    const desktopButtons = buttons.slice(0, mockSections.length);
    desktopButtons.forEach((btn, i) => {
      expect(btn.textContent).toBe(mockSections[i].label);
    });
  });

  it('calls scrollIntoView with smooth behavior on link click', () => {
    const mockScrollIntoView = vi.fn();
    const el = document.createElement('div');
    el.id = 'education';
    el.scrollIntoView = mockScrollIntoView;
    document.body.appendChild(el);

    render(<NavigationBar sections={mockSections} />);
    const educationButtons = screen.getAllByRole('button', { name: 'Education' });
    fireEvent.click(educationButtons[0]);

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    document.body.removeChild(el);
  });

  it('highlights the active section link', () => {
    vi.mocked(useActiveSection).mockReturnValue('research');
    render(<NavigationBar sections={mockSections} />);

    const researchButtons = screen.getAllByRole('button', { name: 'Research' });
    // Desktop button should have the active class
    expect(researchButtons[0].className).toContain('linkActive');
  });

  it('renders a hamburger button with proper aria attributes', () => {
    render(<NavigationBar sections={mockSections} />);
    const hamburger = screen.getByLabelText('Open navigation menu');
    expect(hamburger).toBeInTheDocument();
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles drawer open/close on hamburger click', () => {
    render(<NavigationBar sections={mockSections} />);
    const hamburger = screen.getByLabelText('Open navigation menu');

    fireEvent.click(hamburger);
    expect(screen.getByLabelText('Close navigation menu')).toBeInTheDocument();
    expect(screen.getByLabelText('Close navigation menu')).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(screen.getByLabelText('Close navigation menu'));
    expect(screen.getByLabelText('Open navigation menu')).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes drawer when a drawer link is clicked', () => {
    const mockScrollIntoView = vi.fn();
    const el = document.createElement('div');
    el.id = 'skills';
    el.scrollIntoView = mockScrollIntoView;
    document.body.appendChild(el);

    render(<NavigationBar sections={mockSections} />);

    // Open drawer
    fireEvent.click(screen.getByLabelText('Open navigation menu'));
    expect(screen.getByLabelText('Close navigation menu')).toBeInTheDocument();

    // Click a drawer link
    const skillsButtons = screen.getAllByRole('button', { name: 'Skills' });
    const drawerButton = skillsButtons[skillsButtons.length - 1]; // drawer button is last
    fireEvent.click(drawerButton);

    // Drawer should close
    expect(screen.getByLabelText('Open navigation menu')).toHaveAttribute('aria-expanded', 'false');

    document.body.removeChild(el);
  });

  it('renders with empty sections array without crashing', () => {
    render(<NavigationBar sections={[]} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
