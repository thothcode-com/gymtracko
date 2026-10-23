import { useInView } from '../../hooks/useInView';
import styles from './Retention.module.css';

export function Retention() {
  const [ringRef, ringInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section id="retention" className={styles.retention}>
      <div className={styles.inner}>
        <div className={styles.visual}>
          <div className={styles.ringWrap} ref={ringRef}>
            <svg viewBox="0 0 280 280" fill="none" aria-hidden="true">
              <circle cx="140" cy="140" r="110" stroke="rgba(255,255,255,0.05)" strokeWidth="20" />
              <circle
                cx="140"
                cy="140"
                r="110"
                stroke="rgba(255,92,26,0.15)"
                strokeWidth="20"
                strokeDasharray="691"
                strokeDashoffset="0"
              />
              <circle
                className={styles.ringArc}
                cx="140"
                cy="140"
                r="110"
                stroke="#FF5C1A"
                strokeWidth="20"
                strokeDasharray="691"
                strokeDashoffset={ringInView ? 173 : 691}
                strokeLinecap="round"
                transform="rotate(-90 140 140)"
              />
              <circle cx="140" cy="140" r="80" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <circle
                cx="140"
                cy="140"
                r="60"
                stroke="rgba(255,92,26,0.1)"
                strokeWidth="1"
                strokeDasharray="3 6"
              />
            </svg>
            <div className={styles.ringLabel}>
              <div className={styles.ringPct}>75%</div>
              <div className={styles.ringSub}>retención en 6 meses</div>
            </div>
          </div>
          <div className={styles.ringCompare}>
            <div className={styles.ringLegend}>
              <div className={styles.ringDot} style={{ background: '#FF5C1A' }}></div>
              Con GYMTRACKO
            </div>
            <div className={styles.ringLegend}>
              <div className={styles.ringDot} style={{ background: 'rgba(255,255,255,0.2)' }}></div>
              Media del sector (40%)
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.tag}>// 04 — Retención</div>
          <h2 className={styles.title}>
            Cada alumno
            <br />
            es distinto.
            <br />
            <em>Por eso se queda.</em>
          </h2>
          <p className={styles.body}>
            Sabemos que cada alumno es diferente y que cada uno merece una rutina pensada para él y
            un equipo que lo mire de cerca. Esa atención individual es lo que lo hace quedarse.
          </p>
        </div>
      </div>
    </section>
  );
}
