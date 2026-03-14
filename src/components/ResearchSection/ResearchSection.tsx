import useInView from '../../hooks/useInView';
import { research } from '../../data/research';
import type { ResearchItem } from '../../types';
import styles from './ResearchSection.module.css';

interface ResearchCardProps {
  item: ResearchItem;
}

const ResearchCard: React.FC<ResearchCardProps> = ({ item }) => {
  const { ref, isInView } = useInView({ triggerOnce: true });
  const cardClass = `${styles.card} ${styles.animated}${isInView ? ` ${styles.visible}` : ''}`;

  const isPublished = item.externalUrl && item.externalUrl.startsWith('http');

  return (
    <article
      className={cardClass}
      ref={ref as React.RefObject<HTMLElement>}
      data-testid={`research-card-${item.id}`}
    >
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.description}>{item.description}</p>
      <p className={styles.venue}>{item.venue}</p>
      {isPublished ? (
        <a
          className={styles.link}
          href={item.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Publication →
        </a>
      ) : (
        <span className={styles.pending}>Pending Publication</span>
      )}
    </article>
  );
};

const ResearchSection: React.FC = () => {
  if (research.length === 0) return null;

  return (
    <section id="research" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Research</h2>
        <div className={styles.grid}>
          {research.map((item) => (
            <ResearchCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
