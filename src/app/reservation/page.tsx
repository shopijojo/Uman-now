"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { routes, vehicles, getPrice } from "@/data/pricing";
import { SiteNav } from "@/components/site-nav";
import { useLang, regionLabel, vehicleLabel } from "@/lib/i18n";

type FormData = {
  departureId: string;
  vehicleId: string;
  date: string;
  passengers: string;
  luggage: string;
  withPilgrimage: boolean;
  specialRequests: string;
  name: string;
  email: string;
  whatsapp: string;
};

const EMPTY: FormData = {
  departureId: "",
  vehicleId: "",
  date: "",
  passengers: "",
  luggage: "",
  withPilgrimage: false,
  specialRequests: "",
  name: "",
  email: "",
  whatsapp: "",
};

const regions = Array.from(new Set(routes.map((r) => r.region)));

export default function ReservationPage() {
  const { lang, t } = useLang();
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ref] = useState(() => "UN-" + Math.random().toString(36).slice(2, 8).toUpperCase());

  const price = useMemo(() => {
    if (!form.departureId || !form.vehicleId) return null;
    return getPrice(Number(form.departureId), form.vehicleId, form.withPilgrimage);
  }, [form.departureId, form.vehicleId, form.withPilgrimage]);

  const set = (field: keyof FormData, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  const selectedRoute = routes.find((r) => r.id === Number(form.departureId));
  const selectedVehicle = vehicles.find((v) => v.id === form.vehicleId);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-[#e6e2d8] pt-24">
        <div className="max-w-md w-full">
          <div className="bg-[#f6f3ec] border border-black/[0.07] rounded-[22px] p-10 md:p-12 text-center">
            <div className="w-[58px] h-[58px] rounded-full bg-amber-600 flex items-center justify-center mx-auto mb-6 text-[#f2efe7] text-2xl font-extrabold">
              ✓
            </div>
            <div className="font-mono text-[11px] tracking-[0.26em] uppercase text-amber-600 mb-3">{t.confKicker}</div>
            <h1 className="font-sans font-extrabold text-[28px] md:text-[34px] leading-[1.1] tracking-[-0.02em] mb-2.5">
              {t.thanks} {form.name}
            </h1>
            <p className="text-black/60 mb-8 leading-relaxed">{t.confBody}</p>

            <div className="text-start bg-white border border-black/[0.08] rounded-2xl px-6 py-5 mb-7 flex flex-col gap-3.5">
              <SummaryRow label={t.sumDepart} value={selectedRoute ? `${selectedRoute.label}${selectedRoute.code ? ` (${selectedRoute.code})` : ""}` : "—"} />
              <div className="h-px bg-black/[0.08]" />
              <SummaryRow label={t.sumVehicle} value={selectedVehicle ? vehicleLabel(selectedVehicle.id, selectedVehicle.label, lang) : "—"} />
              <div className="h-px bg-black/[0.08]" />
              <SummaryRow label={t.sumDate} value={form.date || "—"} />
              <div className="h-px bg-black/[0.08]" />
              <SummaryRow label={t.sumPax} value={form.passengers || "—"} />
              <div className="h-px bg-black/[0.08]" />
              <SummaryRow label={t.sumRef} value={ref} mono />
            </div>

            <Link
              href="/"
              className="inline-block border-none rounded-[13px] bg-[#16181d] text-[#f2efe7] font-sans font-bold text-sm px-7 py-3.5 hover:bg-black transition-colors"
            >
              {t.backHome}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-12 bg-[#e6e2d8]">
      <SiteNav showLinks={false} />

      <div className="max-w-[620px] mx-auto pt-24">
        <div className="mb-9">
          <div className="font-mono text-[11px] tracking-[0.26em] uppercase text-amber-600 mb-3.5">{t.resKicker}</div>
          <h1 className="font-sans font-extrabold text-[32px] md:text-[42px] leading-[1.05] tracking-[-0.02em] mb-2">{t.resTitle}</h1>
          <p className="text-black/60">{t.resSub}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* TRAJET */}
          <Section title={t.trajet}>
            <Field label={t.departLabel}>
              <select required value={form.departureId} onChange={(e) => set("departureId", e.target.value)} className="input">
                <option value="">{t.departPrompt}</option>
                {regions.map((region) => (
                  <optgroup key={region} label={regionLabel(region, lang)}>
                    {routes
                      .filter((r) => r.region === region)
                      .map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.label}
                          {r.code ? ` (${r.code})` : ""}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </Field>

            <Field label={t.vehicleLabel}>
              <select required value={form.vehicleId} onChange={(e) => set("vehicleId", e.target.value)} className="input">
                <option value="">{t.vehiclePrompt}</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {vehicleLabel(v.id, v.label, lang)} — {v.capacity}
                  </option>
                ))}
              </select>
            </Field>

            {price !== null && (
              <div className="flex items-center justify-between px-5 py-4 rounded-xl bg-[#16181d] text-[#f2efe7]">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/55">{t.priceKicker}</span>
                <span dir="ltr" className="font-sans font-extrabold text-2xl tracking-[-0.02em] text-amber-500">
                  {price.toLocaleString()} €
                </span>
              </div>
            )}
            {form.departureId && form.vehicleId && price === null && (
              <p className="text-sm text-black/50 italic">{t.priceUnavailable}</p>
            )}

            <Field label={t.dateLabel}>
              <input type="date" required value={form.date} onChange={(e) => set("date", e.target.value)} className="input" />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label={t.paxLabel}>
                <input
                  type="number"
                  min={1}
                  max={80}
                  required
                  value={form.passengers}
                  onChange={(e) => set("passengers", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label={t.bagsLabel}>
                <input type="number" min={0} value={form.luggage} onChange={(e) => set("luggage", e.target.value)} className="input" />
              </Field>
            </div>

            {selectedRoute?.withPilgrimage && (
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div
                  onClick={() => set("withPilgrimage", !form.withPilgrimage)}
                  className={`w-10 h-6 rounded-full transition-colors relative ${form.withPilgrimage ? "bg-amber-600" : "bg-stone-300"}`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.withPilgrimage ? "translate-x-5" : "translate-x-1"}`}
                  />
                </div>
                <span className="text-sm text-black/70">{t.pilgrimageLabel}</span>
              </label>
            )}

            <Field label={t.specialLabel} optionalLabel={t.specialOptional}>
              <textarea rows={3} placeholder={t.specialPh} value={form.specialRequests} onChange={(e) => set("specialRequests", e.target.value)} className="input resize-none" />
            </Field>
          </Section>

          {/* CONTACT */}
          <Section title={t.contact}>
            <Field label={t.nameLabel}>
              <input type="text" required placeholder={t.namePh} value={form.name} onChange={(e) => set("name", e.target.value)} className="input" />
            </Field>
            <Field label={t.emailLabel}>
              <input type="email" required placeholder="vous@email.com" value={form.email} onChange={(e) => set("email", e.target.value)} className="input" />
            </Field>
            <Field label={t.whatsappLabel}>
              <input type="tel" required placeholder="+33 6 00 00 00 00" value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} className="input" />
            </Field>
          </Section>

          {form.name && form.email && form.departureId && form.vehicleId && (
            <div className="rounded-xl border border-amber-600/25 bg-amber-50/60 px-5 py-4 text-sm text-black/60 space-y-1">
              <p className="font-semibold text-black/80 mb-2">{t.recap}</p>
              <p>
                {t.sumDepart} : <span className="text-black/90">{selectedRoute?.label}</span>
              </p>
              <p>
                {t.sumVehicle} : <span className="text-black/90">{selectedVehicle ? vehicleLabel(selectedVehicle.id, selectedVehicle.label, lang) : ""} ({selectedVehicle?.capacity})</span>
              </p>
              {price && (
                <p>
                  {t.priceKicker} : <span dir="ltr" className="text-amber-700 font-semibold">{price.toLocaleString()} €</span>
                </p>
              )}
              <p>
                {t.sumRef} : <span className="font-mono text-amber-700">{ref}</span>
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-[#16181d] text-[#f2efe7] font-sans font-bold text-sm tracking-wide hover:bg-black transition-colors disabled:opacity-60"
          >
            {loading ? t.submitting : t.submit}
          </button>

          <p className="text-center text-xs text-black/50">{t.reassure}</p>
        </form>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-[20px] border border-black/[0.07] bg-[#f6f3ec]">
      <h2 className="font-sans font-bold text-xl tracking-[-0.01em]">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, optionalLabel, children }: { label: string; optionalLabel?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-black/50">
        {label} {optionalLabel && <span className="text-black/30 normal-case tracking-normal">{optionalLabel}</span>}
      </label>
      {children}
    </div>
  );
}

function SummaryRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-black/50">{label}</span>
      <span className={`font-sans font-semibold text-[15px] text-end ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}
