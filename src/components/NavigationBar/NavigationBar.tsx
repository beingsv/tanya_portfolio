import { useState, useMemo, useCallback } from 'react';
import useActiveSection from '../../hooks/useActiveSection';
import type { SectionLink } from '../../types';
import styles from './NavigationBar.module.css';

interface NavigationBarProps {
  sections: SectionLink[];
}

const NavigationBar: React.FC<NavigationBarProps> = ({ sections }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sectionIds = useMemo(
    () => sections.map((s) => s.id),
    [sections],
  );

  const activeSection = useActiveSection(sectionIds);

  const handleClick = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setDrawerOpen(false);
    },
    [],
  );

  const toggleDrawer = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand} aria-hidden="true" />

        {/* Desktop links */}
        <ul className={styles.linkList} role="list">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                type="button"
                className={`${styles.link}${activeSection === section.id ? ` ${styles.linkActive}` : ''}`}
                onClick={() => handleClick(section.id)}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Hamburger button — mobile only */}
        <button
          type="button"
          className={`${styles.hamburger}${drawerOpen ? ` ${styles.hamburgerOpen}` : ''}`}
          onClick={toggleDrawer}
          aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={drawerOpen}
          aria-controls="nav-drawer"
        >
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`${styles.overlay}${drawerOpen ? ` ${styles.overlayVisible}` : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Slide-out drawer */}
      <div
        id="nav-drawer"
        className={`${styles.drawer}${drawerOpen ? ` ${styles.drawerOpen}` : ''}`}
        role="dialog"
        aria-label="Navigation menu"
        aria-modal={drawerOpen}
      >
        <ul className={styles.drawerList} role="list">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                type="button"
                className={`${styles.drawerLink}${activeSection === section.id ? ` ${styles.drawerLinkActive}` : ''}`}
                onClick={() => handleClick(section.id)}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
