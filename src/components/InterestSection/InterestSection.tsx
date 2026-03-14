import useInView from '../../hooks/useInView';
import { interests } from '../../data/interests';
import type { InterestArea } from '../../types';
import styles from './InterestSection.module.css';

interface InterestCardProps {
  interest: InterestArea;
}

const InterestCard: React.FC<InterestCardProps> = ({ interest }) => {
  const { ref, isInView } = useInView({ triggerOnce: true });
  const cardClass = `${styles.card} ${styles.animated}${isInView ? ` ${styles.visible}` : ''}`;

  return (
    <article
      className={cardClass}
      ref={ref as React.RefObject<HTMLElement>}
      data-testid={`interest-card-${interest.id}`}
    >
      <h3 className={styles.label}>{interest.label}</h3>
      <p className={styles.summary}>{interest.summary}</p>
    </article>
  );
};

const InterestSection: React.FC = () => {
  if (interests.length === 0) return null;

  return (
    <section id="interests" className={styles.section} data-testid="interest-section">
      <div className={styles.inner}>
        <h2 className={styles.heading}>Areas of Interest</h2>
        <div className={styles.grid}>
          {interests.map((interest) => (
            <InterestCard key={interest.id} interest={interest} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InterestSection;
