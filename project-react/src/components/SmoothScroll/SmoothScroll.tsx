import { useLenisScroll } from '../../hooks/useLenisScroll';

/** Mounts the Lenis smooth-scroll + in-page anchor handling; renders nothing. */
export function SmoothScroll() {
  useLenisScroll();
  return null;
}
