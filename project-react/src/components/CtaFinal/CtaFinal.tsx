import { RADIOGRAFIA_LABEL, RADIOGRAFIA_URL } from '../../data/contact';
import styles from './CtaFinal.module.css';

export function CtaFinal() {
  return (
    <section id="cta-final" className={styles.cta}>
      <div className={styles.tag}>// Empezá hoy</div>
      <h2 className={styles.title}>
        <span>Tu gimnasio</span>
        <span className={styles.accent}>del futuro</span>
        <span>empieza acá.</span>
      </h2>
      <p className={styles.sub}>
        Analizamos los datos de asistencia, bajas e ingresos de tu gimnasio y te mostramos dónde
        estás perdiendo socios y plata. Sin costo.
      </p>
      <div className={styles.buttons}>
        <a href={RADIOGRAFIA_URL} target="_blank" rel="noopener" className={styles.btnPrimary}>
          {RADIOGRAFIA_LABEL}
        </a>
      </div>
      <p className={styles.note}>Atención de lunes a viernes, de 8 a 22 hs.</p>
    </section>
  );
}
