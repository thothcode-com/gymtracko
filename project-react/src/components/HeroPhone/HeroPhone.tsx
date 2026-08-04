import type { RefObject } from 'react';
import { useHeroPhoneTilt } from '../../hooks/useHeroPhoneTilt';
import { useHeroPhoneScrollFollow } from '../../hooks/useHeroPhoneScrollFollow';
import styles from './HeroPhone.module.css';

interface HeroPhoneProps {
  featuresRef: RefObject<HTMLElement | null>;
}

export function HeroPhone({ featuresRef }: HeroPhoneProps) {
  const { phoneRef, innerRef } = useHeroPhoneTilt();
  useHeroPhoneScrollFollow(phoneRef, featuresRef);

  return (
    <div className={styles.phone} ref={phoneRef}>
      <div className={styles.inner} ref={innerRef}>
        <div className={styles.notch}></div>
        <div className={styles.screen}></div>
      </div>
      <div className={styles.glow}></div>
    </div>
  );
}
