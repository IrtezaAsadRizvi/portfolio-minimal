"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Tilt from "./Tilt";

export interface TrainingItemData {
  slug: string;
  title: string;
  provider: string;
  providerIcon: string;
  category: string;
  tag: string;
  period: string;
  description: string;
  certificate: string;
  width: number;
  height: number;
  placeholder: string;
  viewLabel: string;
  downloadLabel: string;
}

interface TrainingModalProps {
  item: TrainingItemData | null;
  onClose: () => void;
}

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function CertificatePreview({ item }: { item: TrainingItemData }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${item.placeholder})`,
          filter: "blur(42px)",
          transform: "scale(1.5)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.certificate}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover motion-safe:transition-[opacity,transform,filter] motion-safe:duration-1000 motion-safe:ease-out"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "scale(1)" : "scale(1.5)",
          filter: loaded ? "blur(0)" : "blur(42px)",
          willChange: "filter, transform, opacity",
        }}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}

export default function TrainingModal({ item, onClose }: TrainingModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!item) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKey);

    const focusTimer = window.setTimeout(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = dialog.querySelectorAll<HTMLElement>(FOCUSABLE);
      (focusables[0] ?? dialog).focus();
    }, 0);

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = originalOverflow;
      window.clearTimeout(focusTimer);
      previouslyFocusedRef.current?.focus();
    };
  }, [item, onClose]);

  if (!item || typeof document === "undefined") return null;

  const dialog = (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      tabIndex={-1}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-surface/85 backdrop-blur-sm p-4 md:p-12 outline-none"
      style={{ animation: "fadeIn 200ms ease-out forwards" }}
    >
      <Tilt
        className="relative overflow-hidden rounded-sm shadow-2xl"
        style={{
          width: `min(56rem, calc(85vh * ${item.width} / ${item.height}))`,
          height: `min(85vh, calc(56rem * ${item.height} / ${item.width}))`,
          aspectRatio: `${item.width} / ${item.height}`,
        }}
      >
        <CertificatePreview key={item.slug} item={item} />
      </Tilt>

      <a
        href={item.certificate}
        download
        aria-label={item.downloadLabel}
        title={item.downloadLabel}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-accent transition-colors"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3v13" />
          <path d="M6 11l6 6 6-6" />
          <path d="M4 21h16" />
        </svg>
      </a>
    </div>
  );

  return createPortal(dialog, document.body);
}
