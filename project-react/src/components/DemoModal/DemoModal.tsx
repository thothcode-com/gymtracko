import { useEffect, useRef, useState } from 'react';
import type { SubmitEvent } from 'react';
import { useDemoModal } from '../../context/DemoModalContext';
import styles from './DemoModal.module.css';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const countryOptions = [
  { code: '+54', label: 'Argentina +54' },
  { code: '+55', label: 'Brasil +55' },
  { code: '+598', label: 'Uruguay +598' },
  { code: '+595', label: 'Paraguay +595' },
  { code: '+56', label: 'Chile +56' },
  { code: '+591', label: 'Bolivia +591' },
  { code: '+51', label: 'Perú +51' },
  { code: '+57', label: 'Colombia +57' },
  { code: '+52', label: 'México +52' },
  { code: '+34', label: 'España +34' },
];

const businessOptions = [
  'Gimnasio tradicional',
  'Box de CrossFit',
  'Estudio de Yoga / Pilates',
  'Personal Trainer',
  'Centro de entrenamiento funcional',
  'Otro',
];

const branchesOptions = ['1', '2 a 5', '6 a 10', 'Más de 10'];

export function DemoModal() {
  const { isOpen, business, closeDemoModal } = useDemoModal();
  const [submitted, setSubmitted] = useState(false);
  const [businessValue, setBusinessValue] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setBusinessValue(business ?? '');
      // Reset any previous success state so reopening the modal always
      // starts on the form, not a stale "¡Listo!" confirmation.
      setSubmitted(false);
    }
  }, [isOpen, business]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Move initial keyboard focus into the dialog when it opens: to the
  // first form field once it's actually in the DOM. Also re-runs when
  // `submitted` flips back to false (reopening the modal after a previous
  // submission resets the form a render after `isOpen` changes), so focus
  // still lands on the field rather than staying on the dialog fallback.
  useEffect(() => {
    if (!isOpen) return;
    const focusTarget = firstFieldRef.current ?? modalRef.current;
    focusTarget?.focus();
  }, [isOpen, submitted]);

  // Hide the rest of the page from assistive tech and the tab order while
  // the dialog is open, so screen reader and keyboard users can't interact
  // with content behind the overlay.
  useEffect(() => {
    if (!isOpen) return;

    const root = document.getElementById('root');
    const overlay = overlayRef.current;
    const inertedSiblings: HTMLElement[] = [];
    if (root && overlay) {
      Array.from(root.children).forEach((child) => {
        if (child === overlay) return;
        const el = child as HTMLElement & { inert?: boolean };
        el.inert = true;
        inertedSiblings.push(el);
      });
    }

    return () => {
      inertedSiblings.forEach((el) => {
        (el as HTMLElement & { inert?: boolean }).inert = false;
      });
    };
  }, [isOpen]);

  // Escape-to-close + Tab focus trap: keep keyboard focus cycling within
  // the dialog while it's open instead of leaking out to the (inert)
  // background content.
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        closeDemoModal();
        return;
      }
      if (e.key !== 'Tab' || !modalRef.current) return;

      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        if (active === first || !modalRef.current.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last || !modalRef.current.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeDemoModal]);

  // Announce the success state to screen readers and move focus into it,
  // since it replaces the form in place rather than navigating anywhere.
  useEffect(() => {
    if (submitted) {
      successRef.current?.focus();
    }
  }, [submitted]);

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div
      ref={overlayRef}
      className={`${styles.overlay} ${isOpen ? styles['overlay--open'] : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeDemoModal();
      }}
    >
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-modal-title"
        tabIndex={-1}
      >
        <button className={styles.close} aria-label="Cerrar" onClick={closeDemoModal}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div
          ref={successRef}
          className={`${styles.success} ${submitted ? styles['success--visible'] : ''}`}
          role="status"
          aria-live="polite"
          tabIndex={-1}
        >
          <div className={styles.successIcon}>
            <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <circle cx="20" cy="20" r="18" stroke="#FF5C1A" strokeWidth="1.5" />
              <path d="M12 20l6 6 10-12" stroke="#FF5C1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {submitted && (
            <>
              <h3>¡Listo!</h3>
              <p>Recibimos tus datos. Nuestro equipo te va a contactar en breve para agendar tu demostración.</p>
            </>
          )}
        </div>

        {!submitted && (
          <form onSubmit={handleSubmit}>
            <div className={styles.header}>
              <div className={styles.tag}>// Demo gratuita</div>
              <h3 id="demo-modal-title">
                Agenda tu demostración
                <br />
                <em>gratuita</em>
              </h3>
              <p className={styles.sub}>Descubre por qué miles de gimnasios confían en GYMTRACKO.</p>
              <p className={styles.note}>
                Llena el formulario sin compromiso. Demo 100% gratis. Todos los campos son obligatorios.
              </p>
            </div>

            <div className={styles.field}>
              <label htmlFor="demo-name">¿Cuál es tu nombre?</label>
              <input
                ref={firstFieldRef}
                type="text"
                id="demo-name"
                name="name"
                required
                autoComplete="name"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="demo-email">¿Cuál es tu mejor correo electrónico?</label>
              <input type="email" id="demo-email" name="email" required autoComplete="email" />
            </div>

            <div className={styles.field}>
              <label htmlFor="demo-phone">
                Ingresa tu teléfono con código de área. Te llamaremos para agendar tu demostración.
              </label>
              <div className={styles.phoneRow}>
                <select
                  id="demo-country"
                  name="country"
                  className={styles.countrySelect}
                  aria-label="País"
                  defaultValue="+54"
                >
                  {countryOptions.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  id="demo-phone"
                  name="phone"
                  placeholder="11 2345 6789"
                  required
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="demo-business">¿Qué tipo de negocio fitness es el tuyo?</label>
              <select
                id="demo-business"
                name="business"
                required
                value={businessValue}
                onChange={(e) => setBusinessValue(e.target.value)}
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                {businessOptions.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="demo-branches">¿Cuántas sucursales tiene tu negocio?</label>
              <select id="demo-branches" name="branches" required defaultValue="">
                <option value="" disabled>
                  Selecciona una opción
                </option>
                {branchesOptions.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <label className={styles.checkbox}>
              <input type="checkbox" required />
              <span>Al proporcionar mis datos, estoy de acuerdo con la Política de Privacidad.*</span>
            </label>

            <button type="submit" className={styles.submit}>
              Agendar demostración
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
