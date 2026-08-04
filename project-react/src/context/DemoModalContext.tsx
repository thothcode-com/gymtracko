import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface DemoModalContextValue {
  isOpen: boolean;
  business: string | undefined;
  openDemoModal: (business?: string) => void;
  closeDemoModal: () => void;
}

const DemoModalContext = createContext<DemoModalContextValue | null>(null);

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [business, setBusiness] = useState<string | undefined>(undefined);
  // Whatever button/link was focused when the modal was opened (nav CTA,
  // a service item, the footer link, the CTA-final button, ...). Used to
  // return focus there when the modal closes, instead of leaving keyboard
  // and screen reader users stranded at the top of the document.
  const triggerRef = useRef<HTMLElement | null>(null);

  const openDemoModal = useCallback((nextBusiness?: string) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setBusiness(nextBusiness);
    setIsOpen(true);
  }, []);

  const closeDemoModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) return;
    const trigger = triggerRef.current;
    if (trigger) {
      trigger.focus();
      triggerRef.current = null;
    }
  }, [isOpen]);

  const value = useMemo(
    () => ({ isOpen, business, openDemoModal, closeDemoModal }),
    [isOpen, business, openDemoModal, closeDemoModal],
  );

  return <DemoModalContext.Provider value={value}>{children}</DemoModalContext.Provider>;
}

export function useDemoModal() {
  const ctx = useContext(DemoModalContext);
  if (!ctx) throw new Error('useDemoModal must be used within a DemoModalProvider');
  return ctx;
}
