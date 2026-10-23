import { RADIOGRAFIA_LABEL, RADIOGRAFIA_URL } from '../../data/contact';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.bgVideo} aria-hidden="true">
        <img
          className={styles.photo}
          src="/img/hero-1920.webp"
          srcSet="/img/hero-1200.webp 1200w, /img/hero-1920.webp 1920w, /img/hero-2752.webp 2752w"
          sizes="(max-width: 768px) 200vw, 100vw"
          width={2752}
          height={1536}
          alt=""
          fetchPriority="high"
          decoding="async"
        />

        <div className={styles.bgOverlay}></div>
      </div>

      <div className={styles.eyebrow}>El futuro de tu gimnasio</div>
      <h1 className={styles.title}>
        <span className={`${styles.line1} ${styles.glitch}`} data-text="RETENCIÓN">
          RETENCIÓN
        </span>
        <span className={styles.line2}>AUTOMATIZADA</span>
        <span className={styles.line3}>para gimnasios que no se quedan atrás</span>
      </h1>

      <div className={styles.ctas}>
        <a href={RADIOGRAFIA_URL} target="_blank" rel="noopener" className={styles.btnPrimary}>
          {RADIOGRAFIA_LABEL}
        </a>
        <a href="#pilares" className={styles.btnSecondary}>
          Ver cómo funciona
        </a>
      </div>

      <div className={styles.bottom}>
        <p className={styles.desc}>
          <strong>GYMTRACKO</strong> convierte los datos de tu gimnasio en decisiones. Retención,
          finanzas, operación y app para alumnos en un solo lugar: sabés qué socios se enfrían y
          actuás antes de que cancelen.
        </p>
        <div className={styles.stats}>
          <div>
            <div className={styles.statNum}>
              3<span>×</span>
            </div>
            <div className={styles.statLabel}>más retención</div>
          </div>
          <div>
            <div className={styles.statNum}>
              <span>-</span>60<span>%</span>
            </div>
            <div className={styles.statLabel}>cancelaciones</div>
          </div>
          <div>
            <div className={styles.statNum}>
              100<span>%</span>
            </div>
            <div className={styles.statLabel}>digital</div>
          </div>
        </div>
      </div>

      <p className={styles.proof}>
        <span>Confían en GYMTRACKO gimnasios de gran porte como</span>
        <img
          className={styles.proofLogo}
          src="/img/anubis-gym-112.webp"
          srcSet="/img/anubis-gym-112.webp 1x, /img/anubis-gym-168.webp 2x"
          width={141}
          height={112}
          alt="Anubis Gym"
          loading="lazy"
          decoding="async"
        />
        <span>
          <strong>+900 alumnos activos</strong>
        </span>
      </p>
    </section>
  );
}
