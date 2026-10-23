import type { ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';
import styles from './InfoCard.module.css';

interface InfoCardProps {
  name: string;
  desc: string;
  icon: ReactNode;
  tags?: string[];
  /** Position in its grid; used to stagger the entrance animation. */
  index?: number;
}

export function InfoCard({ name, desc, icon, tags, index = 0 }: InfoCardProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`${styles.card} ${inView ? styles['card--visible'] : ''}`}
      style={{ transitionDelay: `${(index % 4) * 0.08}s` }}
    >
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.desc}>{desc}</p>
      {tags && tags.length > 0 && (
        <ul className={styles.tags}>
          {tags.map((tag) => (
            <li className={styles.tag} key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
