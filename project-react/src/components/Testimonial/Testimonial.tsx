import styles from './Testimonial.module.css';

export function Testimonial() {
  return (
    <section id="testimonial" className={styles.testimonial} aria-labelledby="testimonial-heading">
      <div className={styles.block}>
        <h2 id="testimonial-heading" className="sr-only">
          Testimonio de un cliente
        </h2>
        <blockquote className={styles.quote}>
          "Mi gimnasio dejó de <strong>perder alumnos</strong> en silencio. El app avisa antes.
          Nosotros actuamos antes."
        </blockquote>
        <p className={styles.proof}>
          <img
            className={styles.proofLogo}
            src="/img/anubis-gym-168.webp"
            width={212}
            height={168}
            alt="Anubis Gym"
            loading="lazy"
            decoding="async"
          />
          <span>
            usa GYMTRACKO con <strong>+900 alumnos activos</strong>
          </span>
        </p>
        <footer className={styles.author}>
          <cite>Rodrigo Meira · Dueño · Fitness Prime — Buenos Aires</cite>
        </footer>
      </div>
    </section>
  );
}
