"use client";

import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { useLang, FLEET_ORDER } from "@/lib/i18n";
import { vehicles } from "@/data/pricing";

const FLEET_META: Record<string, { pax: string; dark?: boolean }> = {
  taxi: { pax: "1–4" },
  jeep: { pax: "1–4" },
  minivan: { pax: "5–7" },
  sprinter: { pax: "15" },
  midibus: { pax: "29" },
  autocar: { pax: "50" },
  grandcar: { pax: "80" },
};

export default function Home() {
  const { t } = useLang();

  return (
    <main className="flex flex-col min-h-screen bg-[#e6e2d8] text-[#16181d]">
      <SiteNav />

      {/* HERO */}
      <section className="relative bg-[#14161b] text-[#f2efe7] overflow-hidden pt-24">
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-[1.05fr_.95fr] gap-12 md:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-white/20 rounded-full font-mono text-[11px] tracking-[0.16em] uppercase text-white/75">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_0_4px_rgba(217,164,65,0.28)]" />
              {t.badge}
            </div>
            <h1 className="font-sans font-extrabold text-[42px] md:text-[62px] leading-[1.05] tracking-[-0.025em] mt-6 mb-5">
              {t.heroPre} <span className="text-amber-500">{t.heroAccent}</span>
            </h1>
            <p className="max-w-[440px] text-base md:text-[17px] leading-relaxed text-white/70 mb-8">{t.heroSub}</p>
            <div className="flex flex-wrap gap-3.5">
              <Link
                href="/reservation"
                className="border-none rounded-[13px] bg-amber-600 text-stone-950 font-sans font-bold text-base px-7 py-4 hover:bg-amber-500 transition-colors"
              >
                {t.btnPrimary}
              </Link>
              <a
                href="#process"
                className="inline-flex items-center rounded-[13px] border border-white/25 text-[#f2efe7] font-sans font-semibold text-base px-6 py-4 hover:border-white/55 transition-colors"
              >
                {t.btnSecondary}
              </a>
            </div>
          </div>
          <div className="relative w-full max-w-[540px] ms-auto aspect-[3/2] rounded-[22px] overflow-hidden shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] bg-gradient-to-br from-amber-900/40 via-[#14161b] to-black flex items-center justify-center border border-white/10">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/30">Photo à venir</span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-black border-y border-stone-800">
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-9 grid grid-cols-3 gap-6">
          {[
            { num: "27", suffix: "+", label: t.statA },
            { num: "7", suffix: "", label: t.statB },
            { num: "48", suffix: "h", label: t.statC },
          ].map((s, i) => (
            <div key={s.label} className={`flex flex-col gap-1.5 ${i > 0 ? "border-s border-stone-800 ps-6 md:ps-8" : ""}`}>
              <div dir="ltr" className="font-sans font-extrabold text-3xl md:text-[46px] leading-none tracking-[-0.02em] text-stone-50">
                {s.num}
                <span className="text-amber-500">{s.suffix}</span>
              </div>
              <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="max-w-[1180px] mx-auto px-6 md:px-10 py-16 md:py-24 w-full">
        <div className="font-mono text-[11px] tracking-[0.26em] uppercase text-amber-600 mb-3.5">{t.procKicker}</div>
        <h2 className="font-sans font-extrabold text-3xl md:text-[44px] leading-[1.05] tracking-[-0.02em] mb-10 md:mb-14 max-w-[520px]">
          {t.procTitle}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: "01", title: t.s1t, body: t.s1b },
            { n: "02", title: t.s2t, body: t.s2b },
            { n: "03", title: t.s3t, body: t.s3b },
          ].map((step) => (
            <div key={step.n} className="bg-[#f6f3ec] border border-black/[0.06] rounded-[18px] p-7 md:p-8 flex flex-col gap-4">
              <div dir="ltr" className="font-mono font-bold text-[15px] text-amber-600">{step.n}</div>
              <h3 className="font-sans font-bold text-xl tracking-[-0.01em]">{step.title}</h3>
              <p className="text-[15px] leading-relaxed text-black/60">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FLEET */}
      <section id="flotte" className="bg-[#efeae0] border-y border-black/[0.07]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="font-mono text-[11px] tracking-[0.26em] uppercase text-amber-600 mb-3.5">{t.fleetKicker}</div>
          <h2 className="font-sans font-extrabold text-3xl md:text-[44px] leading-[1.05] tracking-[-0.02em] mb-10 md:mb-14 max-w-[520px]">
            {t.fleetTitle}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FLEET_ORDER.map((id) => {
              const v = vehicles.find((veh) => veh.id === id);
              if (!v) return null;
              const meta = FLEET_META[id];
              return (
                <div
                  key={id}
                  className="bg-[#f6f3ec] border border-black/[0.07] rounded-2xl p-6 flex flex-col gap-5 min-h-[160px] justify-between"
                >
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-black/45">{t.pax}</div>
                  <div>
                    <div dir="ltr" className="font-sans font-extrabold text-[32px] md:text-[38px] leading-none tracking-[-0.02em] text-amber-600">
                      {meta.pax}
                    </div>
                    <div className="font-sans font-bold text-base mt-2">{v.label}</div>
                  </div>
                </div>
              );
            })}
            <div className="bg-[#16181d] border border-[#16181d] rounded-2xl p-6 flex flex-col gap-5 min-h-[160px] justify-between text-[#f2efe7]">
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/50">{t.onDemand}</div>
              <div>
                <div dir="ltr" className="font-sans font-extrabold text-[30px] md:text-[34px] leading-none tracking-[-0.02em] text-amber-500">
                  VIP
                </div>
                <div className="font-sans font-bold text-base mt-2">{t.business}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#14161b] text-[#f2efe7]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-16 md:py-24 flex flex-col items-center text-center gap-6">
          <h2 className="font-sans font-extrabold text-3xl md:text-5xl leading-[1.04] tracking-[-0.025em] max-w-[640px]">
            {t.ctaPre} <span className="text-amber-500">{t.ctaAccent}</span> {t.ctaPost}
          </h2>
          <p className="max-w-[440px] text-base md:text-[17px] leading-relaxed text-white/70">{t.ctaSub}</p>
          <Link
            href="/reservation"
            className="mt-1.5 border-none rounded-[13px] bg-amber-600 text-stone-950 font-sans font-bold text-base px-8 py-4 hover:bg-amber-500 transition-colors"
          >
            {t.btnPrimary}
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-[1180px] mx-auto w-full px-6 md:px-10 py-10 flex items-center justify-between flex-wrap gap-4">
        <div dir="ltr" className="flex items-center font-sans font-extrabold text-lg tracking-[-0.03em]">
          <span className="text-[#16181d]">uman</span>
          <span className="text-amber-600">now</span>
        </div>
        <div className="font-mono text-[11px] tracking-[0.08em] text-black/50">{t.footer}</div>
      </footer>
    </main>
  );
}
