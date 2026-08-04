import { useEffect } from 'react';
import type { RefObject } from 'react';

const TOP_OFFSET = 100;

export function useHeroPhoneScrollFollow(
  phoneRef: RefObject<HTMLDivElement | null>,
  featuresRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const phone = phoneRef.current;
    const featuresEl = featuresRef.current;
    if (!phone || !featuresEl) return;

    const followMQ = window.matchMedia('(min-width: 769px)');
    let featTop = 0;
    let featBottom = 0;
    let ticking = false;

    function measure() {
      const rect = featuresEl!.getBoundingClientRect();
      featTop = rect.top + window.scrollY;
      featBottom = rect.bottom + window.scrollY;
    }

    function applyState() {
      if (!followMQ.matches) {
        phone!.style.position = '';
        phone!.style.top = '';
        phone!.style.opacity = '0';
        ticking = false;
        return;
      }
      const y = window.scrollY;
      const phoneH = phone!.offsetHeight;
      const startFollowY = featTop - TOP_OFFSET;
      const freezeStartY = featBottom - phoneH - TOP_OFFSET;
      const freezeTopY = featBottom - phoneH;

      if (y < startFollowY) {
        phone!.style.position = '';
        phone!.style.top = '';
        phone!.style.opacity = '0';
      } else if (y < freezeStartY) {
        phone!.style.position = 'fixed';
        phone!.style.top = `${TOP_OFFSET}px`;
        phone!.style.opacity = '1';
      } else {
        phone!.style.position = 'absolute';
        phone!.style.top = `${freezeTopY}px`;
        phone!.style.opacity = '1';
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(applyState);
        ticking = true;
      }
    }

    function onResize() {
      measure();
      applyState();
    }

    measure();
    applyState();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
