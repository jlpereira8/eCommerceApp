"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { UserIcon } from "@heroicons/react/24/solid";

/**
 * Types
 */
export type NavLink = {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
};

export type NavSection = {
  label: string;
  items: NavLink[];
};

export type MegaGroup = {
  trigger: string; // visible label in the menubar
  sections: NavSection[]; // columns in the mega menu
};

export type NavData = {
  brand: string;
  primary: NavLink[]; // simple links that live in the menubar
  mega: MegaGroup[]; // groups that open a mega menu on desktop
  quickLinks: NavLink[]; // used in search and mobile drawer
};

/**
 * Sample nav data (replace with your own). Fully typed.
 */
export const navData: NavData = {
  brand: "ÉVOQUE",
  primary: [],
  mega: [
    {
      trigger: "Home",
      sections: [
        {
          label: "Explore",
          items: [
            { label: "Overview", href: "/", description: "Start here" },
          ],
        },
      ],
    },
      {
      trigger: "Collections",
      sections: [
        {
          label: "Browse",
          items: [
            { label: "All Collections", href: "/collections", description: "Curated sets" },
            { label: "Best Sellers", href: "/collections/best-sellers", description: "Most-loved picks" },
            { label: "Staff Picks", href: "/collections/staff-picks", description: "Hand‑selected" },
          ],
        },
        {
          label: "By Category",
          items: [
            { label: "Electronics", href: "/collections/electronics", description: "Gadgets & gear" },
            { label: "Home & Living", href: "/collections/home-living", description: "Daily essentials" },
            { label: "Fitness", href: "/collections/fitness", description: "Train smart" },
          ],
        },
        {
          label: "Price Tiers",
          items: [
            { label: "Under $50", href: "/collections/under-50", description: "Budget wins" },
            { label: "$50–$150", href: "/collections/50-150", description: "Mid‑range" },
            { label: "Premium", href: "/collections/premium", description: "Top shelf" },
          ],
        },
      ],
    },
    {
      trigger: "New",
      sections: [
        {
          label: "Latest",
          items: [
            { label: "New Arrivals", href: "/new", description: "Fresh drops" },
            { label: "Just Restocked", href: "/new/restocked", description: "Back in stock" },
          ],
        },
        {
          label: "Coming Soon",
          items: [
            { label: "Sneak Peek", href: "/new/coming-soon", description: "Preview the queue" },
            { label: "Waitlist", href: "/new/waitlist", description: "Get notified" },
          ],
        },
        {
          label: "Spotlight",
          items: [
            { label: "Editor’s Picks", href: "/new/editors-picks", description: "Our favorites" },
            { label: "Limited Edition", href: "/new/limited", description: "Short run releases" },
          ],
        },
      ],
    },
  ],
  quickLinks: [
    { label: "Changelog", href: "/changelog" },
    { label: "Blog", href: "/blog" },
    { label: "Support", href: "/support" },
  ],
};

/**
 * Utilities
 */
function clsx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function useIsRtl() {
  const [rtl, setRtl] = useState(false);
  useEffect(() => {
    if (typeof document !== "undefined") {
      setRtl(document?.dir === "rtl");
    }
  }, []);
  return rtl;
}

/**
 * Dark mode toggle: toggles the html.dark class, stores preference.
 */
function DarkModeToggle() {
  const [isDark, setIsDark] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ls = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const shouldDark = ls ? ls === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", shouldDark);
    setIsDark(shouldDark);
  }, []);

  const toggle = useCallback(() => {
    const next = !isDark;
    setIsDark(next);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", next);
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {}
    }
  }, [isDark]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label="Toggle dark mode"
      className={
        "rounded-full p-2 ring-1 ring-black/10 hover:ring-black/20 dark:ring-white/10 dark:hover:ring-white/20"
      }
    >
      <span className="sr-only">Toggle theme</span>
      {/* simple sun/moon */}
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        {isDark ? (
          <path fill="currentColor" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
              <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
              <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
            </g>
          </>
        )}
      </svg>
    </button>
  );
}

/**
 * Desktop mega menu
 */
function MegaMenu({
  open,
  anchorRef,
  onClose,
  sections,
  labelledBy,
}: {
  open: boolean;
  anchorRef: React.RefObject<HTMLElement>;
  onClose: () => void;
  sections: NavSection[];
  labelledBy: string; // id of the trigger button
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onClick = (e: MouseEvent) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node) && !anchorRef.current?.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, onClose, anchorRef]);

  // Position below header using full-width container
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          ref={panelRef}
          role="menu"
          aria-labelledby={labelledBy}
          className={
            "absolute left-0 right-0 top-full z-30 mx-auto w-full max-w-6xl p-4"
          }
        >
          <div className="rounded-2xl bg-white/80 backdrop-blur shadow-xl ring-1 ring-black/10 dark:bg-gray-900/80 dark:ring-white/10">
            <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
              {sections.map((sec) => (
                <div key={sec.label}>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {sec.label}
                  </div>
                  <ul className="space-y-2">
                    {sec.items.map((it) => (
                      <li key={it.label}>
                        <Link
                          href={it.href}
                          className="group block rounded-lg p-2 hover:bg-black/5 focus:bg-black/5 focus:outline-none dark:hover:bg-white/5 dark:focus:bg-white/5"
                          role="menuitem"
                          onClick={onClose}
                        >
                          <div className="text-sm font-medium">{it.label}</div>
                          {it.description && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">{it.description}</div>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/**
 * Mobile drawer (accessible dialog with basic focus management)
 */
function MobileDrawer({ open, onClose, data }: { open: boolean; onClose: () => void; data: NavData }) {
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const first = panelRef.current?.querySelector<HTMLElement>("button, a, input, [tabindex]:not([tabindex='-1'])");
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        // naive focus trap
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
          "button, a, input, [tabindex]:not([tabindex='-1'])"
        );
        if (!focusables || focusables.length === 0) return;
        const list = Array.from(focusables);
        const idx = list.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && (idx === 0 || idx === -1)) {
          e.preventDefault();
          list[list.length - 1].focus();
        } else if (!e.shiftKey && idx === list.length - 1) {
          e.preventDefault();
          list[0].focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
            ref={panelRef}
            className="fixed inset-0 z-50 h-full w-full overflow-auto rounded-none bg-white p-6 shadow-2xl ring-1 ring-black/10 dark:bg-gray-900 dark:text-white"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="text-lg font-semibold">Menu</div>
              <button onClick={onClose} aria-label="Close menu" className="rounded p-2 hover:bg-black/5 dark:hover:bg-white/10">
                <span aria-hidden>✕</span>
              </button>
            </div>

            <nav className="space-y-4">
              <ul className="space-y-2">
                {data.primary.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="block rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/10" onClick={onClose}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {data.mega.map((group) => (
                <div key={group.trigger}>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {group.trigger}
                  </div>
                  {group.sections.map((sec) => (
                    <div key={sec.label} className="mt-2">
                      <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{sec.label}</div>
                      <ul className="mt-1 space-y-1">
                        {sec.items.map((it) => (
                          <li key={it.label}>
                            <Link href={it.href} className="block rounded p-2 hover:bg-black/5 dark:hover:bg-white/10" onClick={onClose}>
                              {it.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}

              <div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  More
                </div>
                <ul className="mt-1 space-y-1">
                  {navData.quickLinks.map((q) => (
                    <li key={q.label}>
                      <Link href={q.href} className="block rounded p-2 hover:bg-black/5 dark:hover:bg-white/10" onClick={onClose}>
                        {q.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

/**
 * Command palette (Ctrl/Cmd K) with arrow navigation
 */
function SearchCommand({ open, onClose, data }: { open: boolean; onClose: () => void; data: NavData }) {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const router = useRouter();
  const listRef = useRef<HTMLUListElement>(null);

  const items = useMemo(() => {
    const pool = [
      ...data.primary,
      ...data.quickLinks,
      ...data.mega.flatMap((g) => g.sections.flatMap((s) => s.items)),
    ];
    const q = query.trim().toLowerCase();
    if (!q) return pool.slice(0, 24);
    return pool.filter((i) => i.label.toLowerCase().includes(q) || i.href.toLowerCase().includes(q)).slice(0, 24);
  }, [data, query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, items.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        const item = items[activeIdx];
        if (item) router.push(item.href);
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, items, activeIdx, router, onClose]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  if (!open) return null;

  return (
    <>
      <motion.div className="fixed inset-0 z-40 bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal
        aria-label="Command palette"
        className="fixed inset-0 z-50 grid place-items-center p-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
      >
        <div className="w-full max-w-xl rounded-2xl bg-white/80 p-3 shadow-2xl ring-1 ring-black/10 backdrop-blur dark:bg-gray-900/80 dark:ring-white/10">
          <div className="flex items-center gap-2 rounded-xl bg-black/5 p-2 ring-1 ring-black/10 focus-within:ring-black/20 dark:bg-white/5 dark:ring-white/10 dark:focus-within:ring-white/20">
            <svg aria-hidden className="h-5 w-5 opacity-60" viewBox="0 0 24 24">
              <path fill="currentColor" d="M10 4a6 6 0 1 0 3.9 10.6l4.7 4.7 1.4-1.4-4.7-4.7A6 6 0 0 0 10 4zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
            </svg>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              aria-label="Search"
              className="w-full bg-transparent p-2 text-sm outline-none"
            />
            <kbd className="ml-auto rounded bg-black/10 px-2 py-1 text-[10px] tracking-widest text-black/70 dark:bg-white/10 dark:text-white/70">
              ⌘K / Ctrl K
            </kbd>
          </div>
          <ul ref={listRef} role="listbox" className="mt-2 max-h-72 overflow-auto rounded-xl ring-1 ring-black/10 dark:ring-white/10">
            {items.length === 0 ? (
              <li className="p-3 text-sm text-gray-500 dark:text-gray-400">No results</li>
            ) : (
              items.map((it, idx) => (
                <li key={it.href} role="option" aria-selected={idx === activeIdx}>
                  <Link
                    href={it.href}
                    className={clsx(
                      "block p-3 text-sm hover:bg-black/5 focus:bg-black/5 dark:hover:bg-white/10 dark:focus:bg-white/10",
                      idx === activeIdx && "bg-black/5 dark:bg-white/10"
                    )}
                    onClick={onClose}
                  >
                    {it.label}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </motion.div>
    </>
  );
}

/**
 * Navbar (desktop + mobile, keyboard navigable, ARIA‑correct)
 */
export default function Navbar() {
  const pathname = usePathname();
  const isRtl = useIsRtl();

  // open state
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [openMegaIndex, setOpenMegaIndex] = useState<number | null>(null);

  // cmd+k listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMetaK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k";
      if (isMetaK) {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setCmdOpen(false);
        setOpenMegaIndex(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // refs for mega triggers
    const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onMenubarKey = (e: React.KeyboardEvent) => {
    const count = navData.primary.length + navData.mega.length;
    const idx = triggerRefs.current.findIndex((el) => el === document.activeElement);
    const nextKey = isRtl ? "ArrowLeft" : "ArrowRight";
    const prevKey = isRtl ? "ArrowRight" : "ArrowLeft";
    if (e.key === nextKey) {
      e.preventDefault();
      const next = (idx + 1 + count) % count;
      triggerRefs.current[next]?.focus();
    } else if (e.key === prevKey) {
      e.preventDefault();
      const prev = (idx - 1 + count) % count;
      triggerRefs.current[prev]?.focus();
    } else if (e.key === "Escape") {
      setOpenMegaIndex(null);
    }
  };

  return (
    <>
      <header className="relative sticky top-0 z-40 border-b border-black/10 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-gray-900/70">
        <div className="mx-auto grid max-w-6xl grid-cols-3 items-center p-3 sm:p-4">
          {/* Left: hamburger + inline primary links */}
          <div className="flex items-center gap-3">
            <button
              className="mr-1 rounded p-2 ring-1 ring-black/10 sm:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <span aria-hidden>☰</span>
            </button>
            <ul className="hidden md:flex items-center gap-2">
              {navData.primary.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={clsx(
                      "rounded-xl px-3 py-2 text-sm font-medium hover:bg-black/5 focus:bg-black/5 focus:outline-none dark:hover:bg-white/10 dark:focus:bg-white/10",
                      pathname === item.href && "bg-black/5 dark:bg-white/10"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Mega triggers for desktop */}
            <ul
              className="hidden md:flex items-center gap-2"
              onKeyDown={onMenubarKey}
              role="menubar"
            >
              {navData.mega.map((group, mIdx) => {
                const idx = mIdx; // index within mega list
                const overallIdx = navData.primary.length + idx;
                const triggerId = `mega-trigger-${idx}`;
                return (
                  <li key={group.trigger}>
                    <button
                      id={triggerId}
                      ref={(el) => { triggerRefs.current[overallIdx] = el; }}
                      type="button"
                      role="menuitem"
                      aria-haspopup="true"
                      aria-expanded={openMegaIndex === idx}
                      aria-controls={openMegaIndex === idx ? `mega-panel-${idx}` : undefined}
                      className={clsx(
                        "rounded-xl px-3 py-2 text-sm font-medium ring-1 ring-transparent hover:bg-black/5 focus:bg-black/5 focus:outline-none dark:hover:bg-white/10 dark:focus:bg-white/10",
                        openMegaIndex === idx && "bg-black/5 dark:bg-white/10"
                      )}
                      onMouseEnter={() => setOpenMegaIndex(idx)}
                      onFocus={() => setOpenMegaIndex(idx)}
                      onClick={() => setOpenMegaIndex((v) => (v === idx ? null : idx))}
                      onMouseLeave={(e) => {
                        // let the panel handle outside hover/close
                      }}
                    >
                      {group.trigger}
                    </button>
                    <MegaMenu
                      open={openMegaIndex === idx}
                      anchorRef={{ current: triggerRefs.current[overallIdx] } as React.RefObject<HTMLElement>}
                      onClose={() => setOpenMegaIndex(null)}
                      sections={group.sections}
                      labelledBy={triggerId}
                    />
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Middle: centered brand/logo */}
          <div className="justify-self-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1 sm:gap-2 px-0 py-0 text-sm sm:text-base font-semibold hover:underline max-w-[60vw]"
            >
              <span className="truncate tracking-tight text-body dark:text-offwhite text-sm sm:text-lg">{navData.brand}</span>
            </Link>
          </div>

          {/* Right: Cart, user avatar, dark/light toggle */}
          <div className="flex items-center justify-end gap-2">
            <Link
              href="/cart"
              aria-label="Cart"
              className="rounded-xl px-3 py-2 text-sm ring-1 ring-black/10 hover:ring-black/20 dark:ring-white/10 dark:hover:ring-white/20"
            >
              <span className="inline-flex items-center gap-2">
                <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
                  <path fill="currentColor" d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.44A2 2 0 0 0 10 19h9v-2h-8.42a.25.25 0 0 1-.22-.37L11.1 14h6.45a2 2 0 0 0 1.84-1.23L22 6H6.42l-.7-2zM7 20a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                </svg>
                <span className="hidden sm:inline">Cart</span>
              </span>
            </Link>
            <button
              type="button"
              aria-label="Account"
              className="rounded-full p-2 ring-1 ring-black/10 hover:ring-black/20 dark:ring-white/10 dark:hover:ring-white/20"
            >
              <UserIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* <DarkModeToggle /> */}
          </div>
        </div>
      </header>

      {/* Overlays */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} data={navData} />
      <SearchCommand open={cmdOpen} onClose={() => setCmdOpen(false)} data={navData} />
    </>
  );
}
