import { useInView } from '../../hooks/useInView';
import { InfoCard } from '../InfoCard/InfoCard';
import { sidebarItems, metrics, alertRows, adminModules } from '../../data/admin';
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
        <div className={styles.mockupBody}>
          <div className={styles.mockupSidebar}>
            <div className={styles.sidebarLogo}>
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  stroke="#FF5C1A"
                  strokeWidth="1.2"
                  strokeDasharray="37.7"
                  strokeDashoffset="9.4"
                  transform="rotate(-90 8 8)"
                />
              </svg>
              GYMTRACKO
            </div>
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                className={`${styles.sidebarItem} ${item.active ? styles['sidebarItem--active'] : ''}`}
              >
                {item.icon}
                {item.label}
              </div>
            ))}
          </div>
          <div className={styles.mockupContent}>
            <div className={styles.mcRow}>
              {metrics.map((metric) => (
                <div className={styles.mcMetric} key={metric.label}>
                  <div className={styles.mcMetricLabel}>{metric.label}</div>
                  <div
                    className={`${styles.mcMetricVal} ${
                      metric.valueTone ? styles[`mcMetricVal--${metric.valueTone}`] : ''
                    }`}
                  >
                    {metric.value}
                  </div>
                  <div
                    className={`${styles.mcMetricDelta} ${
                      metric.deltaTone ? styles[`mcMetricDelta--${metric.deltaTone}`] : ''
                    }`}
                  >
                    {metric.delta}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.mcTableHeader}>
              <span className={styles.mcTableTitle}>Alertas de inactividad</span>
              <span className={styles.mcAlertBadge}>18 en riesgo</span>
            </div>
            <table className={styles.mcTable}>
              <thead>
                <tr>
                  <th scope="col">Alumno</th>
                  <th scope="col">Último entrenamiento</th>
                  <th scope="col">Días vencidos</th>
                  <th scope="col">Estado</th>
                </tr>
              </thead>
              <tbody>
                {alertRows.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.lastTraining}</td>
                    <td>{row.streak}</td>
                    <td>
                      <div className={styles.statusDotRow}>
                        <div className={`${styles.statusDot} ${styles[`statusDot--${row.status}`]}`}></div>
                        {row.statusLabel}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={styles.modules}>
        {adminModules.map((module, i) => (
          <InfoCard key={module.name} index={i} {...module} />
        ))}
      </div>
    </section>
  );
}
