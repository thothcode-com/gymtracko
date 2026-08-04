import { useGridCanvas } from '../../hooks/useGridCanvas';
import styles from './GridCanvas.module.css';

export function GridCanvas() {
  const canvasRef = useGridCanvas();
  return <canvas className={styles.canvas} ref={canvasRef} aria-hidden="true"></canvas>;
}
