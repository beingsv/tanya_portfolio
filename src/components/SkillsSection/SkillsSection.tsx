import useInView from '../../hooks/useInView';
import { skills } from '../../data/skills';
import type { SkillCategory } from '../../types';
import styles from './SkillsSection.module.css';

const DELAY_STEP_MS = 100;

interface SkillCategoryGroupProps {
  category: SkillCategory;
}

const SkillCategoryGroup: React.FC<SkillCategoryGroupProps> = ({ category }) => {
  const { ref, isInView } = useInView({ triggerOnce: true });
  const groupClass = `${styles.categoryGroup} ${styles.animated}${isInView ? ` ${styles.visible}` : ''}`;

  return (
    <div
      className={groupClass}
      ref={ref as React.RefObject<HTMLDivElement>}
      data-testid={`skill-category-${category.category}`}
    >
      <div className={styles.categoryHeader}>
        <span className={styles.categoryDot} aria-hidden="true" />
        <h3 className={styles.categoryName}>{category.category}</h3>
      </div>
      <ul className={styles.skillsList}>
        {category.skills.map((skill, index) => (
          <li
            key={skill}
            className={`${styles.skillItem} ${styles.animated}${isInView ? ` ${styles.visible}` : ''}`}
            style={{ transitionDelay: `${index * DELAY_STEP_MS}ms` }}
            data-testid={`skill-item-${skill}`}
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

const SkillsSection: React.FC = () => {
  if (skills.length === 0) return null;

  return (
    <section id="skills" className={styles.section} data-testid="skills-section">
      <div className={styles.inner}>
        <h2 className={styles.heading}>Skills</h2>
        <div className={styles.grid}>
          {skills.map((cat) => (
            <SkillCategoryGroup key={cat.category} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
