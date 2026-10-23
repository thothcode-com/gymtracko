import { navServices } from '../../data/navServices';
import { INSTAGRAM_URL, JOBS_URL, WHATSAPP_URL } from '../../data/contact';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={`${styles.brand}`}>
          <div className={styles.logo}>GYMTRACKO</div>
          <p className={styles.tagline}>
            Plataforma para gimnasios: retención automatizada de socios y crecimiento con datos.
          </p>
          <div className={styles.os}>
            <span>O</span>ptimización &nbsp;·&nbsp; <span>O</span>rganización &nbsp;·&nbsp;{' '}
            <span>O</span>peración
          </div>
        </div>

        <div>
          <h2 className={styles.colTitle}>Contacto</h2>
          <p className={styles.hours}>
            Soporte de lunes a viernes
            <br />
            de 8 a 22 hs
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener"
            className={`${styles.link} ${styles.contactLink}`}
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M10 2a8 8 0 00-6.93 12.02L2 18l4.11-1.07A8 8 0 1010 2z"
                stroke="#FF5C1A"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.9 7.1c.15-.3.3-.4.5-.4h.4c.15 0 .3 0 .4.25.15.3.5 1.15.55 1.25.05.1.05.2 0 .3-.05.15-.1.2-.2.3l-.3.3c-.1.1-.15.2-.05.35.15.3.55.9 1.2 1.5.75.65 1.3.85 1.5.95.2.1.3.1.4-.05l.45-.5c.15-.15.3-.15.5-.05l1.05.5c.2.1.3.15.35.25.05.1.05.5-.1.85-.15.4-.85.8-1.25.85-.35.05-.75.1-2.45-.5-2.1-.8-3.4-2.9-3.5-3.05-.1-.15-.8-1.05-.8-2.05 0-1 .5-1.45.7-1.65z"
                fill="#FF5C1A"
              />
            </svg>
            WhatsApp
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener"
            className={`${styles.link} ${styles.contactLink}`}
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <rect x="2.5" y="2.5" width="15" height="15" rx="4.5" stroke="#FF5C1A" strokeWidth="1.3" />
              <circle cx="10" cy="10" r="3.5" stroke="#FF5C1A" strokeWidth="1.3" />
              <circle cx="14.6" cy="5.4" r="0.9" fill="#FF5C1A" />
            </svg>
            Instagram
          </a>
          <a href="mailto:soporte@gymtracko.com" className={`${styles.link} ${styles.contactLink}`}>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <rect x="2" y="4.5" width="16" height="11" rx="1.5" stroke="#FF5C1A" strokeWidth="1.3" />
              <path
                d="M3 5.5l7 5.5 7-5.5"
                stroke="#FF5C1A"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            soporte@gymtracko.com
          </a>
        </div>

        <div>
          <h2 className={styles.colTitle}>Servicios</h2>
          <ul className={styles.list}>
            {navServices.map((service) => (
              <li key={service.business}>
                <span
                  className={`${styles.link} ${styles.linkStatic} ${service.soon ? '' : styles.featured}`}
                >
                  {service.name}
                  {service.soon && <span className={styles.soon}>Próximamente</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={styles.colTitle}>Empresa</h2>
          <ul className={styles.list}>
            <li>
              <a href={JOBS_URL} target="_blank" rel="noopener" className={styles.link}>
                Trabajá con nosotros
              </a>
            </li>
            <li>
              <a href="#testimonial" className={styles.link}>
                Casos de éxito
              </a>
            </li>
            <li>
              <a href="#" className={styles.link}>
                Integraciones
              </a>
            </li>
            <li>
              <span className={`${styles.link} ${styles.linkStatic}`}>Grupo ThothCode</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.copy}>© 2026 GYMTRACKO</div>
      </div>
    </footer>
  );
}
