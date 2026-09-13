"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { drawerAccordions, drawerFlatLinks, type DrawerLink } from "@/lib/data";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 8"
      fill="none"
      className={`h-[8px] w-[10px] shrink-0 transition-transform duration-300 ease-out ${open ? "rotate-180" : "rotate-0"}`}
    >
      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function DrawerLinkItem({
  item,
  onNavigate,
  onRequireAuth,
  className,
}: {
  item: DrawerLink;
  onNavigate: () => void;
  onRequireAuth: () => void;
  className: string;
}) {
  if (item.authGated) {
    return (
      <button
        type="button"
        onClick={() => {
          onNavigate();
          onRequireAuth();
        }}
        className={`${className} text-left`}
      >
        {item.label}
      </button>
    );
  }
  return (
    <Link href={item.href ?? "/"} onClick={onNavigate} className={className}>
      {item.label}
    </Link>
  );
}

function AccordionSection({
  title,
  items,
  isOpen,
  onToggle,
  onNavigate,
  onRequireAuth,
}: {
  title: string;
  items: DrawerLink[];
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  onRequireAuth: () => void;
}) {
  return (
    <div className="border-b border-ivory/10">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-4 font-mono text-[12px] uppercase tracking-widest2 text-ivory/90 transition-colors hover:text-brass-light"
      >
        {title}
        <ChevronIcon open={isOpen} />
      </button>

      {/* CSS-only accordion: animating grid-template-rows between 0fr/1fr gives a
          smooth height transition without measuring pixel heights in JS. */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-0.5 pb-4 pl-1">
            {items.map((item) => (
              <li key={item.label}>
                <DrawerLinkItem
                  item={item}
                  onNavigate={onNavigate}
                  onRequireAuth={onRequireAuth}
                  className="block py-2 text-[13px] text-ivory/65 transition-colors hover:text-brass-light"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function NavDrawer({
  open,
  onClose,
  onRequireAuth,
}: {
  open: boolean;
  onClose: () => void;
  onRequireAuth: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[110] bg-ink/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Sliding panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`fixed inset-y-0 left-0 z-[120] flex h-full w-[320px] max-w-[85vw] flex-col bg-ink shadow-[20px_0_60px_-15px_rgba(0,0,0,0.5)] transition-transform duration-[350ms] ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ivory/10 px-6 py-5">
          <Link href="/" onClick={onClose} className="flex items-baseline gap-2">
            <span className="font-logo text-xl text-ivory tracking-tight">West</span>
            <span className="font-mono text-[9px] uppercase tracking-widest2 text-brass">Properties</span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory/70 transition-colors hover:border-brass-light hover:text-brass-light"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <ul className="flex flex-col gap-0.5 border-b border-ivory/10 pb-3">
            {drawerFlatLinks.map((item) => (
              <li key={item.label}>
                <DrawerLinkItem
                  item={item}
                  onNavigate={onClose}
                  onRequireAuth={onRequireAuth}
                  className="block py-2.5 font-mono text-[12px] uppercase tracking-widest2 text-ivory/90 transition-colors hover:text-brass-light"
                />
              </li>
            ))}
          </ul>

          {drawerAccordions.map((section) => (
            <AccordionSection
              key={section.title}
              title={section.title}
              items={section.items}
              isOpen={expanded === section.title}
              onToggle={() => setExpanded((cur) => (cur === section.title ? null : section.title))}
              onNavigate={onClose}
              onRequireAuth={onRequireAuth}
            />
          ))}
        </div>

        <div className="border-t border-ivory/10 p-6">
          <Link
            href="/contact"
            onClick={onClose}
            className="block w-full rounded-md border border-brass px-6 py-3 text-center font-mono text-[11px] uppercase tracking-widest2 text-brass transition-all duration-300 hover:bg-brass hover:text-ink"
          >
            Book a Consultation
          </Link>
        </div>
      </div>
    </>
  );
}
