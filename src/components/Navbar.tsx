"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#about");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-3 sm:px-6">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled
            ? "border border-white/50 bg-white/40 shadow-lg shadow-black/[0.03] backdrop-blur-xl"
            : "border border-transparent"
        }`}
      >
        <a
          href="#top"
          aria-label="Mohamed Shahin"
          className={`font-[family-name:var(--font-display)] text-base font-bold tracking-tight ${
            scrolled ? "text-foreground" : "text-white"
          }`}
        >
          {"Mohamed Shahin".split("").map((ch, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="nav-letter"
              style={{ animationDelay: `${i * 55}ms` }}
            >
              {ch}
            </span>
          ))}
          <span
            aria-hidden="true"
            className="nav-letter text-accent"
            style={{ animationDelay: `${"Mohamed Shahin".length * 55}ms` }}
          >
            .
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`mono rounded-full px-3.5 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                  active === l.href
                    ? scrolled
                      ? "text-accent"
                      : "text-white"
                    : scrolled
                      ? "text-muted hover:text-foreground"
                      : "text-white/70 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="/resume"
            className={`mono rounded-full px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
              scrolled
                ? "text-muted hover:text-foreground"
                : "text-white/70 hover:text-white"
            }`}
          >
            Résumé
          </a>
          <a
            href="#contact"
            className={
              scrolled
                ? "btn-accent px-4 py-2 text-sm"
                : "rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
            }
          >
            Hire me
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className={`flex h-9 w-9 items-center justify-center rounded-full border md:hidden ${
            scrolled
              ? "border-white/40 text-foreground"
              : "border-white/30 text-white"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl md:hidden">
          <ul className="flex flex-col gap-1 rounded-2xl border border-white/50 bg-white/50 p-3 shadow-xl backdrop-blur-2xl">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="mono block rounded-xl px-4 py-3 text-xs uppercase tracking-wider text-muted hover:bg-white/50 hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/resume"
                onClick={() => setOpen(false)}
                className="mono block rounded-xl px-4 py-3 text-xs uppercase tracking-wider text-accent hover:bg-white/50"
              >
                Résumé
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
