import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.bgVideo} aria-hidden="true">
        <video autoPlay muted loop playsInline tabIndex={-1}>
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
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

      <div className={styles.bottom}>
        <p className={styles.desc}>
          <strong>GYMTRACKO</strong> convierte datos de entrenamiento en acciones que mantienen a tus
          alumnos activos, comprometidos y pagando.
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

      <div className={styles.scrollIndicator}>
        <span>Scroll</span>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  );
}
