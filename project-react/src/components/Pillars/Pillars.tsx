import type { ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';
import styles from './Pillars.module.css';

interface Pillar {
  num: string;
  audience: string;
  title: string;
  desc: string;
  bullets: string[];
  href?: string;
  linkLabel?: string;
  icon: ReactNode;
  visual: ReactNode;
}

const pillars: Pillar[] = [
  {
    num: '01',
    audience: 'Para el dueño',
    title: 'Ganá más con los socios que ya tenés',
    desc: 'Ingresos, morosidad, asistencia y bajas en paneles claros. Sabé cuánto vale cada socio a lo largo del tiempo (LTV) y dónde se escapa la plata.',
    bullets: ['Métricas para decidir en tiempo real', 'Visión de bajas y LTV', 'Fin de las decisiones a ojo'],
    href: '#admin',
    linkLabel: 'Ver el panel',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M6 34V6M6 34h28" stroke="#FF5C1A" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 26l7-8 6 5 9-12" stroke="#FF5C1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="33" cy="11" r="2.5" fill="#FF5C1A" />
      </svg>
    ),
    visual: (
      <svg className={styles.chart} viewBox="0 0 240 64" fill="none" aria-hidden="true">
        <path d="M0 56h240" stroke="rgba(255,255,255,0.12)" />
        <path
          className={styles.chartArea}
          d="M0 50 30 44 60 47 90 34 120 38 150 22 180 26 210 10 240 6V64H0z"
          fill="#FF5C1A"
          fillOpacity="0.12"
        />
        <path
          className={styles.chartLine}
          pathLength={1}
          d="M0 50 30 44 60 47 90 34 120 38 150 22 180 26 210 10 240 6"
          stroke="#FF5C1A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle className={styles.chartDot} cx="238" cy="6.5" r="3.5" fill="#FF5C1A" />
      </svg>
    ),
  },
  {
    num: '02',
    audience: 'Para los entrenadores',
    title: 'Ningún alumno olvidado',
    desc: 'Historial completo de cada alumno, alertas de quien dejó de venir y rutinas personalizadas. Tu equipo sabe a quién contactar antes de que cancele.',
    bullets: ['Alertas de riesgo de abandono', 'Historial y personalización', 'Equipo capacitado y organizado'],
    href: '#retention',
    linkLabel: 'Ver el seguimiento',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="15" cy="13" r="5" stroke="#FF5C1A" strokeWidth="1.5" />
        <path d="M5 32c0-6 4.5-9 10-9s10 3 10 9" stroke="#FF5C1A" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="29" cy="11" r="4" fill="#FF5C1A" fillOpacity="0.2" stroke="#FF5C1A" strokeWidth="1.5" />
        <path d="M29 9.5v2l1.2 1" stroke="#FF5C1A" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    visual: (
      <ul className={styles.riskList}>
        <li>
          <span className={styles.riskName}>7 días sin entrenar</span>
          <span className={`${styles.badge} ${styles['badge--risk']}`}>En riesgo</span>
        </li>
        <li>
          <span className={styles.riskName}>45 días sin venir</span>
          <span className={`${styles.badge} ${styles['badge--warn']}`}>Contactar</span>
        </li>
        <li>
          <span className={styles.riskName}>Entrena 4 veces por semana</span>
          <span className={`${styles.badge} ${styles['badge--ok']}`}>Activo</span>
        </li>
      </ul>
    ),
  },
  {
    num: '03',
    audience: 'Para el alumno',
    title: 'Una app que da ganas de volver',
    desc: 'Rutina, evolución y metas en la palma de la mano. El alumno ve su propio progreso, se mantiene motivado y entrena con más autonomía.',
    bullets: ['Progreso visible', 'Rutinas en el celular', 'Más compromiso'],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect x="12" y="4" width="16" height="32" rx="3" stroke="#FF5C1A" strokeWidth="1.5" />
        <path d="M17 31h6" stroke="#FF5C1A" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 20l3 3 5-6" stroke="#FF5C1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    visual: (
      <div className={styles.streak}>
        <div className={styles.streakLabel}>Racha semanal</div>
        <div className={styles.streakDots}>
          {[1, 1, 1, 1, 1, 0, 0].map((on, i) => (
            <span key={i} className={`${styles.streakDot} ${on ? styles['streakDot--on'] : ''}`} />
          ))}
        </div>
      </div>
    ),
  },
];

function PillarCard({ num, audience, title, desc, bullets, href, linkLabel, icon, visual }: Pillar) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <article ref={ref} className={`${styles.card} ${inView ? styles['card--visible'] : ''}`}>
      <div className={styles.cardTop}>
        <div className={styles.icon}>{icon}</div>
        <span className={styles.num}>{num}</span>
      </div>
      <div className={styles.audience}>{audience}</div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{desc}</p>
      <ul className={styles.bullets}>
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <div className={styles.visual} aria-hidden="true">
        {visual}
      </div>
      {href && (
        <a href={href} className={styles.link}>
          {linkLabel} <span aria-hidden="true">→</span>
        </a>
      )}
    </article>
  );
}

export function Pillars() {
  return (
    <section id="pilares" className={styles.pillars} aria-labelledby="pillars-heading">
      <div className={styles.header}>
        <div className={styles.tag}>// Una plataforma, tres resultados</div>
        <h2 id="pillars-heading" className={styles.title}>
          Decidí con datos.
          <br />
          <em>Retené más socios.</em>
        </h2>
        <p className={styles.sub}>
          De la caja a la recepción, del entrenador al alumno: todo conectado para que tu gimnasio
          crezca con los socios que ya tiene.
        </p>
      </div>

      <div className={styles.grid}>
        {pillars.map((pillar) => (
          <PillarCard key={pillar.num} {...pillar} />
        ))}
      </div>
    </section>
  );
}
