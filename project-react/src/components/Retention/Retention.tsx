import { useInView } from '../../hooks/useInView';
import styles from './Retention.module.css';

const fitcoinItems = [
  {
    name: 'Completar entrenamiento',
    coins: '+25 FC',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 3v12M3 9h12" stroke="#FF5C1A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Check-in en clase',
    coins: '+15 FC',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="6" stroke="#FF5C1A" strokeWidth="1.5" />
        <path d="M9 6v3l2 2" stroke="#FF5C1A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Mantener racha semanal',
    coins: '+50 FC',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M9 2l1.8 5.4H17l-4.9 3.6 1.8 5.4L9 13l-4.9 3.4 1.8-5.4L1 7.4h6.2z"
          stroke="#FF5C1A"
          strokeWidth="1.2"
        />
      </svg>
    ),
  },
];

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
          <div className={styles.tag}>// 04 — Sistema de fidelización</div>
          <h2 className={styles.title}>
            FitCoins:
            <br />
            tu alumno
            <br />
            <em>no cancela</em>
            <br />
            lo que acumuló.
          </h2>
          <p className={styles.body}>
            La psicología del costo hundido trabaja a tu favor. El alumno con 500 FitCoins lo
            piensa dos veces antes de cancelar la membresía. Es el mismo principio de las millas
            de tarjeta de crédito — pero para gimnasios.
          </p>
          <div className={styles.fitcoinRow}>
            {fitcoinItems.map((item) => (
              <div className={styles.fitcoinItem} key={item.name}>
                <div className={styles.fitcoinIcon}>{item.icon}</div>
                <span className={styles.fitcoinName}>{item.name}</span>
                <span className={styles.fitcoinCoins}>{item.coins}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
