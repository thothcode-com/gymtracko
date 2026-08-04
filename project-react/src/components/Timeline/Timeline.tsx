import { useInView } from '../../hooks/useInView';
import { timelineSteps, includedModules } from '../../data/timeline';
import styles from './Timeline.module.css';

function IncludedModuleCard({ name, desc, icon }: (typeof includedModules)[number]) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`${styles.includedModule} ${inView ? styles['includedModule--visible'] : ''}`}
    >
      <div className={styles.includedModuleIcon}>{icon}</div>
      <div className={styles.includedModuleName}>{name}</div>
      <div className={styles.includedModuleDesc}>{desc}</div>
    </div>
  );
}

export function Timeline() {
  return (
    <section id="timeline" className={styles.timeline}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Implementación en
          <br />
          <em>4 pasos</em>
        </h2>
      </div>
      <div className={styles.steps}>
        {timelineSteps.map((step) => (
          <div className={styles.step} key={step.num}>
            <div className={styles.dot}>{step.num}</div>
            <div className={styles.stepTitle}>{step.title}</div>
            <div className={styles.stepDesc}>{step.desc}</div>
          </div>
        ))}
      </div>

      <div className={styles.includedHeader}>
        <div className={styles.includedTag}>// Todo incluido</div>
        <h3 className={styles.includedTitle}>
          Un ecosistema completo,
          <br />
          <em>no solo una app.</em>
        </h3>
      </div>
      <div className={styles.includedModules}>
        {includedModules.map((module) => (
          <IncludedModuleCard key={module.name} {...module} />
        ))}
      </div>
    </section>
  );
}
