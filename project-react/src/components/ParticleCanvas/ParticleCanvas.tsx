import { useParticleCanvas } from '../../hooks/useParticleCanvas';
import styles from './ParticleCanvas.module.css';

export function ParticleCanvas() {
  const canvasRef = useParticleCanvas();
  return <canvas className={styles.canvas} ref={canvasRef} aria-hidden="true"></canvas>;
}
