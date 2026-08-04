import styles from './Ticker.module.css';

const tickerItems = [
  'Optimización',
  'Organización',
  'Operación',
  'FitCoins',
  'Retención',
  'Racha Semanal',
  'Check-in Digital',
  'Récords Personales',
];

export function Ticker() {
  const loopedItems = [...tickerItems, ...tickerItems];

  return (
    <div className={styles.tickerWrap} aria-hidden="true">
      <div className={styles.ticker}>
        {loopedItems.map((item, i) => (
          <span className={styles.tickerItem} key={`${item}-${i}`}>
            {item}
            <span className={styles.tickerDot}></span>
          </span>
        ))}
      </div>
    </div>
  );
}
