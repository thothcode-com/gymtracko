import { useId, useRef, useState } from 'react';
import type { KeyboardEvent, ReactElement } from 'react';
import { sidebarItems, metrics, alertRows } from '../../data/admin';
import {
  students,
  classesToday,
  routineRequests,
  overdue,
  incomeByMonth,
  staff,
  rewards,
  redemptions,
} from '../../data/adminMock';
import styles from './Admin.module.css';
import view from './AdminMockup.module.css';

type StatusTone = 'green' | 'amber' | 'red';

function StatusDot({ tone, label }: { tone: StatusTone; label: string }) {
  return (
    <div className={styles.statusDotRow}>
      <div className={`${styles.statusDot} ${styles[`statusDot--${tone}`]}`}></div>
      {label}
    </div>
  );
}

function DashboardView() {
  return (
    <>
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
              <td data-label="Último entrenamiento">{row.lastTraining}</td>
              <td data-label="Días vencidos">{row.streak}</td>
              <td data-label="Estado">
                <StatusDot tone={row.status} label={row.statusLabel} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function StudentsView() {
  const [query, setQuery] = useState('');
  const [onlyRisk, setOnlyRisk] = useState(false);
  const searchId = useId();

  const normalized = query.trim().toLowerCase();
  const list = students.filter(
    (s) =>
      s.name.toLowerCase().includes(normalized) && (!onlyRisk || s.status !== 'green'),
  );

  return (
    <>
      <div className={view.toolbar}>
        <label htmlFor={searchId} className={view.srOnly}>
          Buscar alumno
        </label>
        <input
          id={searchId}
          type="search"
          className={view.search}
          placeholder="Buscar alumno…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="button"
          className={`${view.chip} ${onlyRisk ? view['chip--on'] : ''}`}
          aria-pressed={onlyRisk}
          onClick={() => setOnlyRisk((v) => !v)}
        >
          Solo en riesgo
        </button>
      </div>
      <ul className={view.list} aria-live="polite">
        {list.map((s) => (
          <li className={view.row} key={s.name}>
            <div className={view.rowMain}>
              <span className={view.rowName}>{s.name}</span>
              <span className={view.rowSub}>Último entrenamiento: {s.lastTraining}</span>
            </div>
            <StatusDot tone={s.status} label={s.statusLabel} />
          </li>
        ))}
        {list.length === 0 && <li className={view.empty}>Ningún alumno coincide con la búsqueda.</li>}
      </ul>
    </>
  );
}

function AgendaView() {
  const withSpots = classesToday.filter((c) => c.booked < c.capacity).length;
  return (
    <>
      <div className={styles.mcTableHeader}>
        <span className={styles.mcTableTitle}>Clases de hoy</span>
        <span className={view.meta}>
          {classesToday.length} clases · {withSpots} con cupo
        </span>
      </div>
      <ul className={view.list}>
        {classesToday.map((c) => {
          const full = c.booked >= c.capacity;
          return (
            <li className={view.row} key={c.time}>
              <span className={view.time}>{c.time}</span>
              <div className={view.rowMain}>
                <span className={view.rowName}>{c.name}</span>
                <span className={view.rowSub}>Con {c.coach}</span>
                <div className={view.bar} aria-hidden="true">
                  <div
                    className={`${view.barFill} ${full ? view['barFill--full'] : ''}`}
                    style={{ width: `${(c.booked / c.capacity) * 100}%` }}
                  />
                </div>
              </div>
              <span className={full ? view.full : view.spots}>
                {full ? 'Completa' : `${c.capacity - c.booked} cupos`}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function RoutinesView() {
  const [done, setDone] = useState<number[]>([]);
  const pending = routineRequests.length - done.length;
  return (
    <>
      <div className={styles.mcTableHeader}>
        <span className={styles.mcTableTitle}>Solicitudes de rutina</span>
        <span className={view.meta} aria-live="polite">
          {pending} sin responder
        </span>
      </div>
      <ul className={view.list}>
        {routineRequests.map((r) => {
          const answered = done.includes(r.id);
          return (
            <li className={view.row} key={r.id}>
              <div className={view.rowMain}>
                <span className={view.rowName}>{r.student}</span>
                <span className={view.rowSub}>{r.goal}</span>
              </div>
              <button
                type="button"
                className={`${view.action} ${answered ? view['action--done'] : ''}`}
                disabled={answered}
                onClick={() => setDone((d) => [...d, r.id])}
              >
                {answered ? 'Respondida ✓' : 'Responder'}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function FinanceView() {
  const max = Math.max(...incomeByMonth.map((m) => m.value));
  return (
    <>
      <div className={styles.mcTableHeader}>
        <span className={styles.mcTableTitle}>Crecimiento mensual</span>
        <span className={view.meta}>$12 M · ↑ 10% vs. mes anterior</span>
      </div>
      <div className={view.chart} role="img" aria-label="Crecimiento mensual de abril a octubre">
        {incomeByMonth.map((m, i) => (
          <div className={view.chartCol} key={m.month}>
            <div
              className={`${view.chartBar} ${i === incomeByMonth.length - 1 ? view['chartBar--now'] : ''}`}
              style={{ height: `${(m.value / max) * 100}%` }}
            />
            <span className={view.chartLabel}>{m.month}</span>
          </div>
        ))}
      </div>
      <div className={styles.mcTableHeader}>
        <span className={styles.mcTableTitle}>Días vencidos</span>
      </div>
      <ul className={view.list}>
        {overdue.map((o) => (
          <li className={view.row} key={o.name}>
            <span className={view.rowName}>{o.name}</span>
            <StatusDot tone={o.tone} label={`${o.days} días`} />
          </li>
        ))}
      </ul>
    </>
  );
}

function StaffView() {
  return (
    <>
      <div className={styles.mcTableHeader}>
        <span className={styles.mcTableTitle}>Equipo</span>
        <span className={view.meta}>{staff.length} personas</span>
      </div>
      <ul className={view.list}>
        {staff.map((p) => (
          <li className={view.row} key={p.name}>
            <div className={view.rowMain}>
              <span className={view.rowName}>{p.name}</span>
              <span className={view.rowSub}>{p.schedule}</span>
            </div>
            <span className={view.tag}>{p.role}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

function RewardsView() {
  return (
    <>
      <div className={styles.mcTableHeader}>
        <span className={styles.mcTableTitle}>Catálogo de recompensas</span>
        <span className={view.meta}>Costos en FitCoins</span>
      </div>
      <ul className={view.list}>
        {rewards.map((r) => (
          <li className={view.row} key={r.name}>
            <div className={view.rowMain}>
              <span className={view.rowName}>{r.name}</span>
              <span className={view.rowSub}>
                Stock: {r.stock} de {r.maxStock}
              </span>
              <div className={view.bar} aria-hidden="true">
                <div className={view.barFill} style={{ width: `${(r.stock / r.maxStock) * 100}%` }} />
              </div>
            </div>
            <span className={view.cost}>{r.cost.toLocaleString('es-AR')} FC</span>
          </li>
        ))}
      </ul>
    </>
  );
}

function RedemptionsView() {
  const [delivered, setDelivered] = useState<string[]>([]);
  const pending = redemptions.length - delivered.length;
  return (
    <>
      <div className={styles.mcTableHeader}>
        <span className={styles.mcTableTitle}>Canjes</span>
        <span className={view.meta} aria-live="polite">
          {pending} pendientes
        </span>
      </div>
      <ul className={view.list}>
        {redemptions.map((r) => {
          const done = delivered.includes(r.code);
          return (
            <li className={view.row} key={r.code}>
              <div className={view.rowMain}>
                <span className={view.rowName}>
                  {r.item} <span className={view.code}>{r.code}</span>
                </span>
                <span className={view.rowSub}>{r.student}</span>
              </div>
              <button
                type="button"
                className={`${view.action} ${done ? view['action--done'] : ''}`}
                disabled={done}
                onClick={() => setDelivered((d) => [...d, r.code])}
              >
                {done ? 'Entregado ✓' : 'Confirmar entrega'}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

const views: Record<string, () => ReactElement> = {
  Dashboard: DashboardView,
  Alumnos: StudentsView,
  Agenda: AgendaView,
  Rutinas: RoutinesView,
  Finanzas: FinanceView,
  Staff: StaffView,
  Recompensas: RewardsView,
  Canjes: RedemptionsView,
};

export function AdminMockup() {
  const [active, setActive] = useState('Dashboard');
  const baseId = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const labels = sidebarItems.map((i) => i.label);
  const View = views[active];

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const idx = labels.indexOf(active);
    let next = idx;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (idx + 1) % labels.length;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (idx - 1 + labels.length) % labels.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = labels.length - 1;
    else return;
    e.preventDefault();
    setActive(labels[next]);
    tabRefs.current[labels[next]]?.focus();
  }

  return (
    <div className={styles.mockupBody}>
      <div
        className={styles.mockupSidebar}
        role="tablist"
        aria-label="Secciones del panel"
        onKeyDown={onKeyDown}
      >
        <div className={styles.sidebarLogo} aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
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
        {sidebarItems.map((item) => {
          const selected = item.label === active;
          return (
            <button
              key={item.label}
              ref={(el) => {
                tabRefs.current[item.label] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.label}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              className={`${styles.sidebarItem} ${selected ? styles['sidebarItem--active'] : ''}`}
              onClick={() => setActive(item.label)}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>
      <div
        className={styles.mockupContent}
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active}`}
      >
        <View />
      </div>
    </div>
  );
}
