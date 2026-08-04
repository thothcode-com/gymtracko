import { useCustomCursor } from '../../hooks/useCustomCursor';
import styles from './Cursor.module.css';

export function Cursor() {
  const { cursorRef, ringRef } = useCustomCursor();

  return (
    <>
      <div className={styles.cursor} ref={cursorRef} aria-hidden="true"></div>
      <div className={styles.ring} ref={ringRef} aria-hidden="true"></div>
    </>
  );
}
