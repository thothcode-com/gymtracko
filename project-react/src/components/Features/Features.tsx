import type { RefObject } from 'react';
import { features } from '../../data/features';
import { useInView } from '../../hooks/useInView';
import styles from './Features.module.css';

interface FeaturesProps {
  sectionRef: RefObject<HTMLElement | null>;
}

function FeatureCard({ num, name, desc, icon }: (typeof features)[number]) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <div ref={ref} className={`${styles.card} ${inView ? styles['card--visible'] : ''}`}>
      <div className={styles.cardNum}>{num}</div>
      <div className={styles.cardIcon}>{icon}</div>
      <div className={styles.cardName}>{name}</div>
      <div className={styles.cardDesc}>{desc}</div>
    </div>
  );
}

export function Features({ sectionRef }: FeaturesProps) {
  return (
    <section id="features" className={styles.features} ref={sectionRef}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <div className={styles.header}>
            <div>
              <div className={styles.tag}>// 02 — App del alumno</div>
              <h2 className={styles.title}>
                Hechas para
                <br />
                crear <em>hábito</em>
              </h2>
            </div>
            <p className={styles.sub}>
              Cada funcionalidad fue diseñada para una sola cosa: que el alumno vuelva mañana
              también.
            </p>
          </div>
          <div className={styles.grid}>
            {features.map((feature) => (
              <FeatureCard key={feature.num} {...feature} />
            ))}
          </div>
        </div>
        <div className={styles.visualSpace} aria-hidden="true"></div>
      </div>
    </section>
  );
}
