import { useEffect, useRef, useState } from 'react';
import { navServices } from '../../data/navServices';
import { RADIOGRAFIA_URL } from '../../data/contact';
import { useNavScrollEffect } from '../../hooks/useNavScrollEffect';
import styles from './Nav.module.css';

const navLinks = [
  { href: '#admin', label: 'Panel admin' },
  { href: '#retention', label: 'Retención' },
  { href: '#timeline', label: 'Todo incluido' },
  { href: '#team', label: 'Equipo' },
];

export function Nav() {
  const scrolled = useNavScrollEffect();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setDropdownOpen(false);
      }
    }
    function handleResize() {
      if (window.innerWidth > 1300) setMobileOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles['nav--scrolled'] : ''}`}>
      <a href="#" className={styles.nav__logo}>
        <div className={styles['nav__logo-ring']}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#FF5C1A"
              strokeWidth="1.5"
              strokeDasharray="62.8"
              strokeDashoffset="15.7"
              strokeLinecap="round"
              transform="rotate(-90 12 12)"
            />
          </svg>
        </div>
        GYMTRACKO
      </a>

      <ul id="nav-links" className={`${styles.nav__links} ${mobileOpen ? styles['nav__links--open'] : ''}`}>
        <li
          ref={dropdownRef}
          className={`${styles.nav__dropdown} ${dropdownOpen ? styles['nav__dropdown--open'] : ''}`}
        >
          <button
            type="button"
            className={styles['nav__dropdown-toggle']}
            aria-expanded={dropdownOpen}
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen((prev) => !prev);
            }}
          >
            Servicios
            <svg className={styles['nav__dropdown-arrow']} viewBox="0 0 12 8" fill="none" aria-hidden="true">
              <path
                d="M1 1l5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <ul className={styles['nav__dropdown-menu']}>
            {navServices.map((service) => (
              <li
                key={service.business}
                className={service.soon ? undefined : styles['nav__service--featured']}
              >
                <div className={styles['nav__service-item']}>
                  <span className={styles['nav__service-icon']}>{service.icon}</span>
                  <span className={styles['nav__service-body']}>
                    <span className={styles['nav__service-name']}>
                      {service.name}
                      {service.soon && <span className={styles['nav__soon']}>Próximamente</span>}
                    </span>
                    <span className={styles['nav__service-desc']}>{service.description}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </li>
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className={styles.nav__link} onClick={closeMobileMenu}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <a href={RADIOGRAFIA_URL} target="_blank" rel="noopener" className={styles.nav__cta}>
        Radiografía gratis
      </a>

      <button
        type="button"
        className={`${styles.nav__toggle} ${mobileOpen ? styles['nav__toggle--open'] : ''}`}
        aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={mobileOpen}
        aria-controls="nav-links"
        onClick={() => setMobileOpen((prev) => !prev)}
      >
        <span className={styles['nav__toggle-bar']}></span>
        <span className={styles['nav__toggle-bar']}></span>
        <span className={styles['nav__toggle-bar']}></span>
      </button>
    </nav>
  );
}
