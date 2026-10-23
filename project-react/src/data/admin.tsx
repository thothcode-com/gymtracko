import type { ReactNode } from 'react';

export interface SidebarItem {
  label: string;
  active?: boolean;
  icon: ReactNode;
}

export const sidebarItems: SidebarItem[] = [
  {
    label: 'Dashboard',
    active: true,
    icon: (
      <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="5" height="5" rx="1" stroke="#FF5C1A" strokeWidth="1.2" />
        <rect x="8" y="1" width="5" height="5" rx="1" stroke="#FF5C1A" strokeWidth="1.2" />
        <rect x="1" y="8" width="5" height="5" rx="1" stroke="#FF5C1A" strokeWidth="1.2" />
        <rect x="8" y="8" width="5" height="5" rx="1" stroke="#FF5C1A" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    label: 'Alumnos',
    icon: (
      <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M2 12c0-2.8 2.2-4 5-4s5 1.2 5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Agenda',
    icon: (
      <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <rect x="1" y="2" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M4 1v2M10 1v2M1 6h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Rutinas',
    icon: (
      <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M2 4h10M2 7h7M2 10h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Finanzas',
    icon: (
      <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M7 3.8v6M8.9 5.5c0-.9-.9-1.5-1.9-1.5s-1.9.6-1.9 1.4c0 1.8 3.8.8 3.8 2.6 0 .8-.9 1.4-1.9 1.4s-1.9-.7-1.9-1.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: 'Staff',
    icon: (
      <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="5" cy="4.5" r="1.8" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="10.5" cy="5.2" r="1.4" stroke="currentColor" strokeWidth="1" />
        <path d="M1.2 12c0-2.4 1.6-3.6 3.8-3.6s3.8 1.2 3.8 3.6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M9 9c1.6.2 2.8 1.2 2.8 3.2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Recompensas',
    icon: (
      <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 1l1.5 4H13l-3.5 2.5 1.3 4L7 9l-3.8 2.5 1.3-4L1 5h4.5z" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    ),
  },
  {
    label: 'Canjes',
    icon: (
      <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5 4V3a2 2 0 0 1 4 0v1" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
];

export interface Metric {
  label: string;
  value: string;
  valueTone?: 'orange' | 'red';
  delta: string;
  deltaTone?: 'up' | 'down' | 'neutral';
}

export const metrics: Metric[] = [
  { label: 'Alumnos activos', value: '247', delta: '↑ 12 este mes', deltaTone: 'up' },
  { label: 'Inactivos +7 días', value: '18', valueTone: 'red', delta: '↑ 3 esta semana', deltaTone: 'down' },
  { label: 'Crecimiento este mes', value: '$12 M', valueTone: 'orange', delta: '↑ 10% vs. mes anterior', deltaTone: 'up' },
  { label: 'Clases hoy', value: '6', delta: '3 con cupo disponible', deltaTone: 'neutral' },
  { label: 'Alumnos que vinieron hoy', value: '461', valueTone: 'orange', delta: 'Check-ins de hoy', deltaTone: 'neutral' },
  { label: 'Solicitudes rutina', value: '4', delta: 'Sin responder', deltaTone: 'neutral' },
];

export interface AlertRow {
  name: string;
  lastTraining: string;
  streak: string;
  status: 'red' | 'amber' | 'green';
  statusLabel: string;
}

export const alertRows: AlertRow[] = [
  { name: 'Valentina Ríos', lastTraining: 'Hace 14 días', streak: '12 días ❌', status: 'red', statusLabel: 'En riesgo' },
  { name: 'Marcos Ibáñez', lastTraining: 'Hace 9 días', streak: '5 días ⚠️', status: 'amber', statusLabel: 'Alerta' },
  { name: 'Luciana Ferre', lastTraining: 'Hace 7 días', streak: '3 días ⚠️', status: 'amber', statusLabel: 'Alerta' },
  { name: 'Diego Ortega', lastTraining: 'Ayer', streak: 'Al día ✓', status: 'green', statusLabel: 'Activo' },
];

export interface AdminModule {
  name: string;
  desc: string;
  tags: string[];
  icon: ReactNode;
}

export const adminModules: AdminModule[] = [
  {
    name: 'Dashboard',
    desc: 'Métricas en tiempo real y business analytics: activos, inactivos, alumnos en riesgo de abandono, ingresos y solicitudes pendientes.',
    tags: ['Tiempo real', 'Prevención de abandono', 'Alertas automáticas'],
    icon: (
      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="7" height="7" rx="1" stroke="#FF5C1A" strokeWidth="1.2" />
        <rect x="10" y="1" width="7" height="7" rx="1" stroke="#FF5C1A" strokeWidth="1.2" />
        <rect x="1" y="10" width="7" height="7" rx="1" stroke="#FF5C1A" strokeWidth="1.2" />
        <rect x="10" y="10" width="7" height="7" rx="1" stroke="#FF5C1A" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    name: 'Alumnos',
    desc: 'Listado completo con búsqueda y filtro. Alta de socios. Ficha individual con historial y evolución de cada alumno.',
    tags: ['Búsqueda/filtro', 'Alta de socios', 'Evolución y progreso'],
    icon: (
      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="6" r="3" stroke="#FF5C1A" strokeWidth="1.2" />
        <path d="M3 15c0-3.3 2.7-5 6-5s6 1.7 6 5" stroke="#FF5C1A" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Rutinas',
    desc: 'Crea rutinas 100% personalizadas para cada alumno o respondé sus solicitudes directo desde el panel. Historial de cumplimiento por entrenador.',
    tags: ['Rutinas personalizadas', 'Respuesta a solicitudes', 'Por entrenador'],
    icon: (
      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="4" y="3" width="10" height="13" rx="1.2" stroke="#FF5C1A" strokeWidth="1.2" />
        <rect x="6.5" y="1.5" width="5" height="2.5" rx="0.8" stroke="#FF5C1A" strokeWidth="1.2" />
        <path d="M6.5 9l1.5 1.5L12 7" stroke="#FF5C1A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.5 12.5h5" stroke="#FF5C1A" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Agenda',
    desc: 'Vista calendario y lista. Programa clases, sesiones personalizadas y turnos de staff. Creación multi-día en un solo paso.',
    tags: ['Vista calendario', 'CRUD completo', 'Multi-día'],
    icon: (
      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="1" y="2" width="16" height="14" rx="1.5" stroke="#FF5C1A" strokeWidth="1.2" />
        <path d="M5 1v2M13 1v2M1 7h16" stroke="#FF5C1A" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Finanzas',
    desc: 'Control de pagos, cuotas y vencimientos. Visualizá el rendimiento de tu negocio con reportes de ingresos en tiempo real.',
    tags: ['Control de pagos', 'Reportes de ingresos', 'Vencimientos'],
    icon: (
      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="7" stroke="#FF5C1A" strokeWidth="1.2" />
        <path
          d="M9 5v8M11.5 7c0-1.1-1.1-2-2.5-2s-2.5.7-2.5 1.8c0 2.4 5 1 5 3.4 0 1.1-1.1 1.8-2.5 1.8s-2.5-.9-2.5-2"
          stroke="#FF5C1A"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: 'Staff',
    desc: 'Gestioná instructores y personal: roles, permisos, horarios y desempeño, todo desde un mismo lugar.',
    tags: ['Roles y permisos', 'Horarios', 'Desempeño'],
    icon: (
      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="6" cy="5.5" r="2.3" stroke="#FF5C1A" strokeWidth="1.2" />
        <circle cx="13" cy="6.5" r="1.8" stroke="#FF5C1A" strokeWidth="1.1" />
        <path d="M1.5 15c0-3 2-4.5 4.5-4.5s4.5 1.5 4.5 4.5" stroke="#FF5C1A" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M11 11c2 .2 3.5 1.5 3.5 4" stroke="#FF5C1A" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Recompensas',
    desc: 'Gestiona el catálogo completo: crea, edita, controla stock, define niveles y costos en FitCoins.',
    tags: ['CRUD catálogo', 'Control de stock', 'Niveles y costos'],
    icon: (
      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2l1.5 4.5H15l-4 3 1.5 4.5L9 11.5l-3.5 2.5 1.5-4.5-4-3h4.5z" stroke="#FF5C1A" strokeWidth="1.1" />
      </svg>
    ),
  },
  {
    name: 'Canjes',
    desc: 'Busca por código de canje, confirma entrega y consulta el historial de pendientes y entregados.',
    tags: ['Búsqueda por código', 'Confirmar entrega', 'Historial'],
    icon: (
      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="5" width="14" height="10" rx="1.2" stroke="#FF5C1A" strokeWidth="1.2" />
        <path d="M6 5V4a3 3 0 0 1 6 0v1" stroke="#FF5C1A" strokeWidth="1.2" />
        <path d="M9 10v2M7 11h4" stroke="#FF5C1A" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
];
