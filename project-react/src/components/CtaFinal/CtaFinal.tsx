import { useDemoModal } from '../../context/DemoModalContext';
import styles from './CtaFinal.module.css';

export function CtaFinal() {
  const { openDemoModal } = useDemoModal();

  return (
    <section id="cta-final" className={styles.cta}>
      <div className={styles.tag}>// Empieza hoy</div>
      <h2 className={styles.title}>
        <span>Tu gimnasio</span>
        <span className={styles.accent}>del futuro</span>
        <span>empieza aquí.</span>
      </h2>
      <div className={styles.buttons}>
        <button type="button" className={styles.btnPrimary} onClick={() => openDemoModal()}>
          Ver demo gratis
        </button>
        <button type="button" className={styles.btnSecondary}>
          Hablar con un especialista
        </button>
      </div>
    </section>
  );
}
