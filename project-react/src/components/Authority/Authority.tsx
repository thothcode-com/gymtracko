import { useInView } from '../../hooks/useInView';
import styles from './Authority.module.css';

interface Leader {
  initials: string;
  name: string;
  role: string;
  area: string;
  bio: string;
  tags: string[];
}

const leaders: Leader[] = [
  {
    initials: 'JB',
    name: 'Jonas Bazzi',
    role: 'CEO y CTO',
    area: 'Ingeniería',
    bio: 'Más de 12 años como ingeniero de software en grandes marcas. Garantiza la arquitectura, la seguridad y la estabilidad que tu gimnasio necesita para operar sin sobresaltos.',
    tags: ['Seguridad', 'Estabilidad', 'Arquitectura robusta'],
  },
  {
    initials: 'MY',
    name: 'Mayza Ynara',
    role: 'CPO y cofundadora',
    area: 'Producto y personas',
    bio: 'Lidera producto, marca y estrategia, y capacita a los equipos de los clientes. Garantiza que el sistema sea fácil de usar, que tu equipo lo adopte de verdad y que la experiencia del cliente sea buena.',
    tags: ['Facilidad de uso', 'Adopción real', 'Capacitación'],
  },
];

function LeaderCard({ initials, name, role, area, bio, tags }: Leader) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <div ref={ref} className={`${styles.card} ${inView ? styles['card--visible'] : ''}`}>
      <div className={styles.area}>{area}</div>
      <div className={styles.avatar} aria-hidden="true">
        {initials}
      </div>
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.role}>{role}</div>
      <p className={styles.bio}>{bio}</p>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <span className={styles.tag} key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Authority() {
  return (
    <section id="team" className={styles.authority}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>// Construido por quienes entienden de tecnología y operación</div>
        <h2 className={styles.title}>
          Ingeniería de verdad,
          <br />
          <em>pensada para gimnasios.</em>
        </h2>
        <p className={styles.sub}>
          GYMTRACKO combina lo que necesita una plataforma para gimnasios: una base técnica
          sólida y un uso simple en el día a día.
        </p>
      </div>

      <div className={styles.cards}>
        <LeaderCard {...leaders[0]} />
        <div className={styles.plus} aria-hidden="true">
          +
        </div>
        <LeaderCard {...leaders[1]} />
      </div>

      <p className={styles.closing}>
        Los datos no mienten. La decisión es tuya.
      </p>
    </section>
  );
}
