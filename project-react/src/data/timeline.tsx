import type { ReactNode } from 'react';

export interface TimelineStep {
  num: string;
  title: string;
  desc: string;
}

export const timelineSteps: TimelineStep[] = [
  {
    num: '01',
    title: 'Registro',
    desc: 'Configura tu gimnasio, clases y estructura de recompensas en menos de 30 minutos.',
  },
  {
    num: '02',
    title: 'Alumnos',
    desc: 'Invita a tus alumnos. Cada uno hace el onboarding y configura su objetivo y días de entrenamiento.',
  },
  {
    num: '03',
    title: 'Activación',
    desc: 'Los entrenadores crean planes en el app. El sistema de racha y FitCoins se activa automáticamente.',
  },
  {
    num: '04',
    title: 'Resultados',
    desc: 'Monitorea retención, compromiso y alumnos en riesgo de baja en tiempo real.',
  },
];

export interface IncludedModule {
  name: string;
  desc: string;
  icon: ReactNode;
}

export const includedModules: IncludedModule[] = [
  {
    name: 'Control de acceso QR',
    desc: 'Cada alumno ingresa escaneando su código QR personal en la puerta. Se acabó el control manual, las planillas de asistencia y las tarjetas físicas que se pierden.',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="5" height="5" stroke="#FF5C1A" strokeWidth="1.2" />
        <rect x="12" y="1" width="5" height="5" stroke="#FF5C1A" strokeWidth="1.2" />
        <rect x="1" y="12" width="5" height="5" stroke="#FF5C1A" strokeWidth="1.2" />
        <rect x="10" y="10" width="2" height="2" fill="#FF5C1A" />
        <rect x="14" y="10" width="3" height="2" fill="#FF5C1A" />
        <rect x="10" y="14" width="2" height="3" fill="#FF5C1A" />
        <rect x="14" y="15" width="3" height="2" fill="#FF5C1A" />
      </svg>
    ),
  },
  {
    name: 'Pago electrónico',
    desc: 'Cobra cuotas, clases sueltas y productos directo desde la app, con pagos recurrentes automáticos. Menos morosidad, menos efectivo, menos planillas de cobranza.',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="1" y="4" width="16" height="11" rx="1.5" stroke="#FF5C1A" strokeWidth="1.2" />
        <path d="M1 7.5h16" stroke="#FF5C1A" strokeWidth="1.2" />
        <path d="M4 11.5h4" stroke="#FF5C1A" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Entrenamiento digital',
    desc: 'Rutinas personalizadas o predefinidas que el alumno sigue paso a paso desde el celular, con registro de series, pesos y evolución en cada sesión.',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="3" y="2" width="12" height="15" rx="1.5" stroke="#FF5C1A" strokeWidth="1.2" />
        <path d="M6.5 1.5h5v2h-5z" stroke="#FF5C1A" strokeWidth="1.1" />
        <path d="M6 7.5h6M6 10.5h6M6 13.5h3.5" stroke="#FF5C1A" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Booking de clases',
    desc: 'El alumno reserva su lugar en cada clase desde la app y ve los cupos disponibles en tiempo real, sin llamar ni pasar por recepción.',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="1" y="3" width="16" height="13" rx="1.5" stroke="#FF5C1A" strokeWidth="1.2" />
        <path d="M5 1.5v3M13 1.5v3M1 7h16" stroke="#FF5C1A" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M6 11l2 2 4-4" stroke="#FF5C1A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'App con tu marca',
    desc: 'Tu logo, tus colores y tu nombre en una app exclusiva para tus alumnos, publicada en Google Play y App Store como si fuera 100% tuya.',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="4" y="1" width="10" height="16" rx="2" stroke="#FF5C1A" strokeWidth="1.2" />
        <path d="M7 14.5h4" stroke="#FF5C1A" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="9" cy="6" r="2" stroke="#FF5C1A" strokeWidth="1.1" />
      </svg>
    ),
  },
  {
    name: 'Landing page propia',
    desc: 'Una página profesional que presenta tu academia, tus planes y tus resultados — pensada para captar alumnos nuevos y mejorar tu posicionamiento online.',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="1" y="2.5" width="16" height="13" rx="1.5" stroke="#FF5C1A" strokeWidth="1.2" />
        <path d="M1 6h16" stroke="#FF5C1A" strokeWidth="1.2" />
        <circle cx="3.5" cy="4.2" r="0.6" fill="#FF5C1A" />
        <circle cx="5.5" cy="4.2" r="0.6" fill="#FF5C1A" />
      </svg>
    ),
  },
  {
    name: 'Business analytics',
    desc: 'Reportes de ingresos, retención, ocupación de clases y comportamiento de tus alumnos, para decidir con datos reales y no con intuición.',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M2 16V2M2 16h14" stroke="#FF5C1A" strokeWidth="1.2" strokeLinecap="round" />
        <rect x="4.5" y="10" width="2.2" height="6" fill="#FF5C1A" fillOpacity="0.7" />
        <rect x="8.2" y="6" width="2.2" height="10" fill="#FF5C1A" fillOpacity="0.85" />
        <rect x="11.9" y="3" width="2.2" height="13" fill="#FF5C1A" />
      </svg>
    ),
  },
  {
    name: 'Control por alumno',
    desc: 'Ficha individual con historial de asistencia, pagos, rutinas y evolución — todo centralizado y accesible desde el panel de administración.',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="5.5" r="3" stroke="#FF5C1A" strokeWidth="1.2" />
        <path d="M3 16c0-4 2.7-6 6-6s6 2 6 6" stroke="#FF5C1A" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
];
