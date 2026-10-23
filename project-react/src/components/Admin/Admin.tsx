import { useInView } from '../../hooks/useInView';
import { InfoCard } from '../InfoCard/InfoCard';
import { adminModules } from '../../data/admin';
import { AdminMockup } from './AdminMockup';
import styles from './Admin.module.css';

export function Admin() {
  const [mockupRef, mockupInView] = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section id="admin" className={styles.admin}>
      <div className={styles.header}>
        <div>
          <div className={styles.tag}>// 03 — Panel de administración</div>
          <h2 className={styles.title}>
            Vos también
            <br />
            tenés el
            <br />
            <em>control total.</em>
          </h2>
        </div>
        <p className={styles.intro}>
          GYMTRACKO no es solo para el alumno. Como dueño o encargado, tenés una plataforma completa
          que controla <strong>socios, rutinas, agenda, finanzas, staff y recompensas</strong> —
          todo en tiempo real, sin planillas ni papel.
        </p>
      </div>

      <div
        ref={mockupRef}
        className={`${styles.mockup} ${mockupInView ? styles['mockup--visible'] : ''}`}
      >
        <div className={styles.mockupTopbar}>
          <div className={styles.mockupDot} style={{ background: '#E24B4A' }}></div>
          <div className={styles.mockupDot} style={{ background: '#EF9F27' }}></div>
          <div className={styles.mockupDot} style={{ background: '#639922' }}></div>
          <div className={styles.mockupTitleBar}>GYMTRACKO — Panel de administración</div>
        </div>
        <AdminMockup />
      </div>

      <div className={styles.modules}>
        {adminModules.map((module, i) => (
          <InfoCard key={module.name} index={i} {...module} />
        ))}
      </div>
    </section>
  );
}
