// Sample data for the interactive admin panel mock-up. Illustrative only.

export type Tone = 'green' | 'amber' | 'red';

export interface MockStudent {
  name: string;
  lastTraining: string;
  status: Tone;
  statusLabel: string;
}

export const students: MockStudent[] = [
  { name: 'Diego Ortega', lastTraining: 'Ayer', status: 'green', statusLabel: 'Activo' },
  { name: 'Camila Duarte', lastTraining: 'Hoy', status: 'green', statusLabel: 'Activo' },
  { name: 'Luciana Ferre', lastTraining: 'Hace 7 días', status: 'amber', statusLabel: 'Alerta' },
  { name: 'Marcos Ibáñez', lastTraining: 'Hace 9 días', status: 'amber', statusLabel: 'Alerta' },
  { name: 'Valentina Ríos', lastTraining: 'Hace 14 días', status: 'red', statusLabel: 'En riesgo' },
  { name: 'Joaquín Paz', lastTraining: 'Hoy', status: 'green', statusLabel: 'Activo' },
  { name: 'Sofía Acosta', lastTraining: 'Ayer', status: 'green', statusLabel: 'Activo' },
  { name: 'Nicolás Vera', lastTraining: 'Hace 16 días', status: 'red', statusLabel: 'En riesgo' },
];

export interface MockClass {
  time: string;
  name: string;
  coach: string;
  booked: number;
  capacity: number;
}

// 6 classes today, 3 of them with spots left (matches the dashboard metric)
export const classesToday: MockClass[] = [
  { time: '07:00', name: 'Funcional', coach: 'Martín', booked: 20, capacity: 20 },
  { time: '09:00', name: 'Spinning', coach: 'Lucía', booked: 14, capacity: 18 },
  { time: '12:00', name: 'Entrenamiento guiado', coach: 'Martín', booked: 12, capacity: 12 },
  { time: '17:30', name: 'Funcional', coach: 'Ezequiel', booked: 16, capacity: 20 },
  { time: '19:00', name: 'Movilidad', coach: 'Lucía', booked: 15, capacity: 15 },
  { time: '20:30', name: 'Boxeo', coach: 'Ezequiel', booked: 9, capacity: 16 },
];

export interface MockRoutineRequest {
  id: number;
  student: string;
  goal: string;
}

// 4 requests, matches the dashboard metric "Solicitudes rutina: 4"
export const routineRequests: MockRoutineRequest[] = [
  { id: 1, student: 'Camila Duarte', goal: 'Ganar masa muscular · 4 días' },
  { id: 2, student: 'Joaquín Paz', goal: 'Bajar de peso · 3 días' },
  { id: 3, student: 'Sofía Acosta', goal: 'Mejorar resistencia · 5 días' },
  { id: 4, student: 'Nicolás Vera', goal: 'Volver a entrenar · 3 días' },
];

export interface MockOverdue {
  name: string;
  days: number;
  tone: Tone;
}

export const overdue: MockOverdue[] = [
  { name: 'Valentina Ríos', days: 12, tone: 'red' },
  { name: 'Marcos Ibáñez', days: 5, tone: 'amber' },
  { name: 'Luciana Ferre', days: 3, tone: 'amber' },
];

export const incomeByMonth = [
  { month: 'Abr', value: 7.8 },
  { month: 'May', value: 8.4 },
  { month: 'Jun', value: 9.1 },
  { month: 'Jul', value: 9.6 },
  { month: 'Ago', value: 10.2 },
  { month: 'Sep', value: 10.9 },
  { month: 'Oct', value: 12 },
];

export interface MockStaff {
  name: string;
  role: string;
  schedule: string;
}

export const staff: MockStaff[] = [
  { name: 'Martín Gómez', role: 'Entrenador', schedule: 'Lun a vie · 7 a 13 hs' },
  { name: 'Lucía Fernández', role: 'Instructora', schedule: 'Lun a vie · 9 a 20 hs' },
  { name: 'Ezequiel Rojas', role: 'Entrenador', schedule: 'Lun a sáb · 15 a 21 hs' },
  { name: 'Paula Navarro', role: 'Recepción', schedule: 'Lun a sáb · 8 a 16 hs' },
];

export interface MockReward {
  name: string;
  cost: number;
  stock: number;
  maxStock: number;
}

export const rewards: MockReward[] = [
  { name: 'Botella térmica', cost: 800, stock: 12, maxStock: 20 },
  { name: 'Pase para un invitado', cost: 400, stock: 30, maxStock: 30 },
  { name: 'Remera del gimnasio', cost: 1200, stock: 5, maxStock: 15 },
  { name: 'Mes de entrenamiento gratis', cost: 5000, stock: 2, maxStock: 5 },
];

export interface MockRedemption {
  code: string;
  student: string;
  item: string;
}

export const redemptions: MockRedemption[] = [
  { code: 'CJ-4821', student: 'Camila Duarte', item: 'Botella térmica' },
  { code: 'CJ-4817', student: 'Diego Ortega', item: 'Pase para un invitado' },
  { code: 'CJ-4809', student: 'Sofía Acosta', item: 'Remera del gimnasio' },
];
