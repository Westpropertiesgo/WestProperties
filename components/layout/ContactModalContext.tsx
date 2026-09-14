"use client";

import { createContext, useContext, useState } from "react";

interface ContactModalContextValue {
  isOpen: boolean;
  /** Optional context line shown above the form (e.g. which listing/page it was opened from). */
  openContactModal: (context?: string) => void;
  closeContactModal: () => void;
  context: string | undefined;
}

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<string | undefined>(undefined);

  const openContactModal = (nextContext?: string) => {
    setContext(nextContext);
    setIsOpen(true);
  };

  const closeContactModal = () => setIsOpen(false);

  return (
    <ContactModalContext.Provider value={{ isOpen, openContactModal, closeContactModal, context }}>
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    // Provider not mounted (shouldn't happen once wired into layout) — safe no-op default
    return {
      isOpen: false,
      openContactModal: () => {},
      closeContactModal: () => {},
      context: undefined,
    } satisfies ContactModalContextValue;
  }
  return ctx;
}
