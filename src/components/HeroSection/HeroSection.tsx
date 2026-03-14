import { useState, useCallback } from 'react';
import useInView from '../../hooks/useInView';
import { scholar } from '../../data/scholar';
import styles from './HeroSection.module.css';

function getInitials(fullName: string): string {
  return fullName
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const HeroSection: React.FC = () => {
  const { ref, isInView } = useInView({ triggerOnce: true });
  const [imgError, setImgError] = useState(false);

  const handleImgError = useCallback(() => {
    setImgError(true);
  }, []);

  const sectionClass = `${styles.hero} ${styles.animated}${isInView ? ` ${styles.visible}` : ''}`;

  return (
    <section
      id="hero"
      className={sectionClass}
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className={styles.heroInner}>
        <div className={styles.content}>
          <h1 className={styles.name}>{scholar.fullName}</h1>
          <p className={styles.title}>{scholar.title}</p>
          <p className={styles.affiliation}>{scholar.affiliation}</p>
          <p className={styles.tagline}>{scholar.tagline}</p>
        </div>

        <div className={styles.photoWrapper}>
          {imgError ? (
            <div
              className={styles.placeholder}
              role="img"
              aria-label={`Profile photo of ${scholar.fullName}`}
            >
              {getInitials(scholar.fullName)}
            </div>
          ) : (
            <img
              className={styles.photo}
              src={scholar.profilePhotoUrl}
              alt={`Profile photo of ${scholar.fullName}`}
              onError={handleImgError}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
