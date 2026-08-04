import { useInView } from '../../hooks/useInView';
import { useCountUp } from '../../hooks/useCountUp';
import styles from './Problem.module.css';

interface StatItem {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const stats: StatItem[] = [
  {
    value: 7,
    suffix: ' días',
    label:
      'sin pisar el gimnasio es la señal de alerta que dispara la intervención automática, antes de que se pierda el hábito.',
  },
  {
    value: 70,
    suffix: '%',
    label:
      'de las cancelaciones ocurre después de que el alumno rompe su racha de entrenamiento, no al vencer el pago.',
  },
  {
    value: 480,
    prefix: '$',
    label:
      'es el LTV perdido por cada alumno que cancela en el mes 3, cuando el hábito nunca llegó a formarse, en lugar del mes 12.',
  },
];

function StatBlock({ value, prefix = '', suffix = '', label }: StatItem) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });
  const count = useCountUp(value, inView);

  return (
    <div
      ref={ref}
      className={`${styles.statBlock} ${inView ? styles['statBlock--visible'] : ''}`}
    >
      <div className={styles.statNum}>
        {prefix}
        {count}
        {suffix}
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

export function Problem() {
  return (
    <section id="problem" className={styles.problem}>
      <div className={styles.left}>
        <div className={styles.tag}>// 01 — El motivo #1 de cancelación</div>
        <h2 className={styles.title}>
          Cancelan por
          <br />
          falta de
          <br />
          <em>hábito.</em>
        </h2>
        <p className={styles.body}>
          No es el precio. No es la competencia. El alumno cancela cuando pierde el hábito de
          entrenar: falta una semana, después dos, deja de ver resultados y la membresía se
          vuelve un gasto que no usa.
          <br />
          <br />
          GYMTRACKO interviene antes de que el hábito se rompa.
        </p>
      </div>
      <div className={styles.right}>
        {stats.map((stat) => (
          <StatBlock key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
