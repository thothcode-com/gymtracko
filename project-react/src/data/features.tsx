import type { ReactNode } from 'react';

export interface Feature {
  num: string;
  name: string;
  desc: string;
  icon: ReactNode;
}

export const features: Feature[] = [
  {
    num: '01',
    name: 'Racha Semanal',
    desc: 'El alumno ve su racha de semanas consecutivas. El miedo a perder el streak es más poderoso que cualquier descuento para mantener el compromiso.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="16" stroke="#FF5C1A" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="20" cy="20" r="8" fill="#FF5C1A" fillOpacity="0.15" stroke="#FF5C1A" strokeWidth="1" />
        <path d="M20 12v8l5 3" stroke="#FF5C1A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '02',
    name: 'FitCoins',
    desc: 'Sistema de fidelización con moneda interna. El alumno acumula puntos entrenando, reservando clases y completando cardio — y los canjea por recompensas que tú defines.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect x="6" y="6" width="28" height="28" rx="4" stroke="#FF5C1A" strokeWidth="1.5" />
        <path d="M13 20h14M13 14h8M13 26h10" stroke="#FF5C1A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '03',
    name: 'Progreso Visible',
    desc: 'Récords personales, volumen por grupo muscular y sugerencias automáticas de sobrecarga progresiva. El alumno ve evolución concreta en cada entrenamiento.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M8 32L14 20l6 6 6-10 6 4" stroke="#FF5C1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="10" r="4" fill="#FF5C1A" fillOpacity="0.2" stroke="#FF5C1A" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    num: '04',
    name: 'Check-in con PIN',
    desc: 'El instructor genera un PIN de 4 dígitos en la clase. El alumno registra su asistencia en el app y gana FitCoins. Fin del control manual en recepción.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect x="10" y="8" width="20" height="24" rx="3" stroke="#FF5C1A" strokeWidth="1.5" />
        <path d="M15 16h10M15 21h6" stroke="#FF5C1A" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="30" cy="30" r="6" fill="#FF5C1A" />
        <path d="M28 30l1.5 1.5L32 28" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '05',
    name: 'Planes del Trainer',
    desc: 'El alumno solicita una rutina personalizada directo desde el app. El personal la entrega digitalmente. Sin papel, sin WhatsApp, sin pérdida de información.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M20 8C13.4 8 8 13.4 8 20s5.4 12 12 12 12-5.4 12-12" stroke="#FF5C1A" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M28 8l4 4-4 4" stroke="#FF5C1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 20l-4-4" stroke="#FF5C1A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '06',
    name: 'Notificaciones Inteligentes',
    desc: 'Alerta automática cuando el alumno lleva 3+ días sin entrenar. Aviso de racha en riesgo. Recordatorio 30 min antes de cada clase reservada.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M12 20c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="#FF5C1A" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 8v4M20 28v4M8 20h4M28 20h4" stroke="#FF5C1A" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="20" r="3" fill="#FF5C1A" />
      </svg>
    ),
  },
  {
    num: '07',
    name: 'Rutina Propia',
    desc: 'El alumno también puede armar su propia rutina desde cero, eligiendo ejercicios, series, descansos y objetivos — libertad total para quien prefiere entrenar a su manera.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect x="8" y="8" width="24" height="24" rx="3" stroke="#FF5C1A" strokeWidth="1.5" />
        <path d="M14 20h9M14 15h7M14 25h5" stroke="#FF5C1A" strokeWidth="1.5" strokeLinecap="round" />
        <path
          d="M27 12l4 4-9.5 9.5-4.5 1 1-4.5z"
          fill="#FF5C1A"
          fillOpacity="0.15"
          stroke="#FF5C1A"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];
