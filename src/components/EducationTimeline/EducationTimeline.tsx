import useInView from '../../hooks/useInView';
import { education } from '../../data/education';
import type { EducationMilestone } from '../../types';
import styles from './EducationTimeline.module.css';

function getSortYear(milestone: EducationMilestone): number {
  return milestone.endYear ?? Infinity;
}

function formatYearRange(startYear: number, endYear: number | null): string {
  return endYear === null ? `${startYear} – Present` : `${startYear} – ${endYear}`;
}

const sorted = [...education].sort((a, b) => getSortYear(b) - getSortYear(a));

interface TimelineEntryProps {
  milestone: EducationMilestone;
}

const TimelineEntry: React.FC<TimelineEntryProps> = ({ milestone }) => {
  const { ref, isInView } = useInView({ triggerOnce: true });
  const entryClass = `${styles.entry} ${styles.animated}${isInView ? ` ${styles.visible}` : ''}`;

  return (
    <div
      className={entryClass}
      ref={ref as React.RefObject<HTMLDivElement>}
      data-testid={`education-entry-${milestone.id}`}
    >
      <div className={styles.card}>
        <h3 className={styles.institution}>{milestone.institution}</h3>
        <p className={styles.degree}>
          {milestone.degree}, {milestone.field}
        </p>
        <p className={styles.years}>{formatYearRange(milestone.startYear, milestone.endYear)}</p>
      </div>
    </div>
  );
};

const EducationTimeline: React.FC = () => {
  if (sorted.length === 0) return null;

  return (
    <section id="education" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Education</h2>
        <div className={styles.timeline}>
          {sorted.map((milestone) => (
            <TimelineEntry key={milestone.id} milestone={milestone} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationTimeline;
