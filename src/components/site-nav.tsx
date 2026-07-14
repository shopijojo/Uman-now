"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

export function SiteNav({ showLinks = true }: { showLinks?: boolean }) {
  const { lang, t, setLang } = useLang();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#e6e2d8]/85 border-b border-black/10">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-3.5 flex items-center justify-between">
        <Link href="/" dir="ltr" className="flex items-center font-sans font-extrabold text-2xl tracking-[-0.03em]">
          <span className="text-[#16181d]">uman</span>
          <span className="text-amber-600">now</span>
          <span className="w-2 h-2 bg-amber-600 rounded-sm ms-1.5 self-end mb-1.5" />
        </Link>
        <nav className="flex items-center gap-5">
          {showLinks && (
            <>
              <a href="/#process" className="hidden sm:inline font-mono text-[11px] tracking-[0.14em] uppercase text-black/60">
                {t.how}
              </a>
              <a href="/#flotte" className="hidden sm:inline font-mono text-[11px] tracking-[0.14em] uppercase text-black/60">
                {t.fleetNav}
              </a>
            </>
          )}
          <div dir="ltr" className="flex border border-black/15 rounded-[10px] overflow-hidden">
            <button
              onClick={() => setLang("fr")}
              className={`border-none px-3 py-2 cursor-pointer font-mono text-[11px] font-bold tracking-wide ${lang === "fr" ? "bg-[#16181d] text-[#f2efe7]" : "bg-transparent text-black/60"}`}
            >
              FR
            </button>
            <button
              onClick={() => setLang("he")}
              className={`border-none px-3 py-2 cursor-pointer text-[13px] font-bold ${lang === "he" ? "bg-[#16181d] text-[#f2efe7]" : "bg-transparent text-black/60"}`}
            >
              עברית
            </button>
          </div>
          <Link
            href="/reservation"
            className="border-none rounded-[11px] bg-[#16181d] text-[#f2efe7] font-sans font-bold text-sm px-5 py-2.5 hover:bg-black transition-colors"
          >
            {t.reserve}
          </Link>
        </nav>
      </div>
    </header>
  );
}
