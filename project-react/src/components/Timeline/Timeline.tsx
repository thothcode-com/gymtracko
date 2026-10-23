import { InfoCard } from '../InfoCard/InfoCard';
import { includedModules } from '../../data/timeline';
import styles from './Timeline.module.css';

export function Timeline() {
  return (
    <section id="timeline" className={styles.timeline} aria-labelledby="included-heading">
      <div className={styles.header}>
        <div className={styles.tag}>// Todo incluido</div>
        <h2 id="included-heading" className={styles.title}>
          Un ecosistema completo,
          <br />
          <em>no solo una app.</em>
        </h2>
      </div>
      <div className={styles.modules}>
        {includedModules.map((module, i) => (
          <InfoCard key={module.name} index={i} {...module} />
        ))}
      </div>
    </section>
  );
}
