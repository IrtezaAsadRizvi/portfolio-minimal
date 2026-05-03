"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import content from "@/data/en.json";

const { logo, links } = content.navigation;

export default function Navigation() {
  const pathname = usePathname();
  const normalized =
    pathname.endsWith("/") && pathname !== "/"
      ? pathname.slice(0, -1)
      : pathname;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav className="flex justify-between items-center w-full px-6 py-8 max-w-5xl mx-auto animate-in">
        <Link
          href="/"
          aria-label={logo}
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <Image
            src="/logo.png"
            alt={logo}
            width={32}
            height={32}
            priority
            className="rounded-sm"
          />
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          {links.map((link) => {
            const isActive = normalized === link.href;
            const isFeatured = link.href === "/ai";
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] font-mono tracking-widest transition-colors nav-link ${
                  isActive
                    ? "text-accent nav-link-active"
                    : isFeatured
                      ? "text-accent hover:text-primary inline-flex items-center gap-1.5"
                      : "text-on-surface-variant/80 hover:text-primary"
                }`}
              >
                {isFeatured && !isActive && (
                  <span
                    aria-hidden="true"
                    className="material-symbols-outlined !text-[14px] text-accent star-pop"
                    style={{ fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24' }}
                  >
                    star
                  </span>
                )}
                {link.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden relative z-50 flex items-center justify-center w-10 h-10 text-on-surface-variant hover:text-accent transition-colors"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </nav>

      <div
        onClick={close}
        aria-hidden="true"
        className={`md:hidden fixed inset-0 z-40 bg-background/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform",
        }}
        className="md:hidden fixed top-0 right-0 z-50 h-full w-[78%] max-w-xs bg-surface border-l border-outline-variant/20 shadow-2xl"
      >
        <div className="flex items-center justify-between px-6 py-8">
          <span className="text-[0.75rem] uppercase tracking-widest text-on-surface-variant/80 font-mono">
            Menu
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="flex items-center justify-center w-10 h-10 text-on-surface-variant hover:text-accent transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="accent-rule mx-6 mb-8" />

        <ul className="px-6 font-mono text-[0.7rem] space-y-5 text-on-surface-variant">
          {links.map((link, i) => {
            const isActive = normalized === link.href;
            const isFeatured = link.href === "/ai";
            return (
              <li
                key={link.href}
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateX(0)" : "translateX(16px)",
                  transition:
                    "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: open ? `${120 + i * 60}ms` : "0ms",
                }}
              >
                <Link
                  href={link.href}
                  onClick={close}
                  className="flex items-center gap-4 group"
                >
                  <span className="text-accent/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`tracking-widest flex-1 transition-colors flex items-center gap-2 ${
                      isActive || isFeatured
                        ? "text-accent"
                        : "text-on-surface group-hover:text-accent"
                    }`}
                  >
                    {link.label}
                    {isFeatured && !isActive && (
                      <span
                        aria-hidden="true"
                        className="material-symbols-outlined !text-[14px] text-accent star-pop"
                        style={{ fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24' }}
                      >
                        star
                      </span>
                    )}
                  </span>
                  <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300">
                    north_east
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div
          className={`absolute bottom-8 left-6 right-6 font-mono text-[0.65rem] text-on-surface-variant/80 transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: open ? `${120 + links.length * 60}ms` : "0ms" }}
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent status-dot" />
            <span className="uppercase tracking-widest">Available for work</span>
          </div>
        </div>
      </aside>
    </>
  );
}
