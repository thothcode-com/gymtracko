import type { ReactNode } from 'react';

export interface NavService {
  business: string;
  name: string;
  description: string;
  icon: ReactNode;
}

export const navServices: NavService[] = [
  {
    business: 'Gimnasio tradicional',
    name: 'Gimnasios y cadenas',
    description:
      'Rachas, FitCoins y alertas de inactividad que mantienen a tus alumnos activos en todas las sedes.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect x="4" y="16" width="6" height="8" rx="1.5" stroke="#FF5C1A" strokeWidth="1.5" />
        <rect x="30" y="16" width="6" height="8" rx="1.5" stroke="#FF5C1A" strokeWidth="1.5" />
        <rect x="10" y="18" width="4" height="4" stroke="#FF5C1A" strokeWidth="1.5" />
        <rect x="26" y="18" width="4" height="4" stroke="#FF5C1A" strokeWidth="1.5" />
        <path d="M14 20h12" stroke="#FF5C1A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    business: 'Estudio de Yoga / Pilates',
    name: 'Studio',
    description:
      'Reservas de clases, pagos y fidelización desde un solo panel, sin planillas ni WhatsApp.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path
          d="M20 8c0 6-4 8-4 14a4 4 0 008 0c0-6-4-8-4-14z"
          stroke="#FF5C1A"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M10 20c4 2 6 4 6 8M30 20c-4 2-6 4-6 8"
          stroke="#FF5C1A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    business: 'Personal Trainer',
    name: 'Personal trainers',
    description:
      'Entrega rutinas digitales, seguí el progreso de cada cliente y cobrá todo desde el celular.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="12" r="5" stroke="#FF5C1A" strokeWidth="1.5" />
        <path
          d="M9 32c0-6.6 5-10 11-10s11 3.4 11 10"
          stroke="#FF5C1A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    business: 'Box de CrossFit',
    name: 'Box de CrossFit',
    description:
      'WODs, rankings y rachas semanales que mantienen a tu comunidad entrenando y compitiendo.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path
          d="M16 14c0-3 2-5 4-5s4 2 4 5"
          stroke="#FF5C1A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="20" cy="24" r="10" stroke="#FF5C1A" strokeWidth="1.5" />
      </svg>
    ),
  },
];
