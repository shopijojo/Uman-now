"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { routes, vehicles, getPrice, getCompetitorPrice } from "@/data/pricing";
import { SiteNav } from "@/components/site-nav";
import { useLang, regionLabel, vehicleLabel } from "@/lib/i18n";

type TripType = "to" | "from" | "roundtrip";

type FormData = {
  tripType: TripType;
  cityId: string;
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
  tripType: "to",
  cityId: "",
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

  const isRoundtrip = form.tripType === "roundtrip";

  const basePrice = useMemo(() => {
    if (!form.cityId || !form.vehicleId) return null;
    return getPrice(Number(form.cityId), form.vehicleId, form.withPilgrimage);
  }, [form.cityId, form.vehicleId, form.withPilgrimage]);

  const baseCompetitor = useMemo(() => {
    if (!form.cityId || !form.vehicleId) return null;
    return getCompetitorPrice(Number(form.cityId), form.vehicleId);
  }, [form.cityId, form.vehicleId]);

  const price = basePrice !== null ? (isRoundtrip ? basePrice * 2 : basePrice) : null;
  const competitorPrice = baseCompetitor !== null ? (isRoundtrip ? baseCompetitor * 2 : baseCompetitor) : null;
  const savings = price !== null && competitorPrice !== null ? competitorPrice - price : null;

  const set = <K extends keyof FormData>(field: K, value: FormData[K]) =>
    setForm((f) => ({ ...f, [field]: value }));

  const selectedCity = routes.find((r) => r.id === Number(form.cityId));
  const selectedVehicle = vehicles.find((v) => v.id === form.vehicleId);

  const cityLabel = selectedCity ? `${selectedCity.label}${selectedCity.code ? ` (${selectedCity.code})` : ""}` : null;

  const tripSummaryLabel = (() => {
    if (!cityLabel) return "—";
    if (form.tripType === "to") return `${cityLabel} → Ouman`;
    if (form.tripType === "from") return `Ouman → ${cityLabel}`;
    return `${cityLabel} ⇄ Ouman`;
  })();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ref,
          tripSummary: tripSummaryLabel,
          vehicle: selectedVehicle ? vehicleLabel(selectedVehicle.id, selectedVehicle.label, lang) : "",
          date: form.date,
          passengers: form.passengers,
          luggage: form.luggage,
          withPilgrimage: form.withPilgrimage,
          specialRequests: form.specialRequests,
          name: form.name,
          email: form.email,
          whatsapp: form.whatsapp,
          price,
        }),
      });
    } catch {
      // La demande reste confirmée côté client même si la notification échoue —
      // on ne bloque pas le client pour un problème d'envoi email/Telegram.
    }
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-[#e6e2d8] pt-24">
        <div className="max-w-md w-full">
          <div className="bg-[#f6f3ec] border border-black/[0.07] rounded-[22px] p-10 md:p-12 text-center">
            <div className="w-[58px] h-[58px] rounded-full bg-[#a9814e] flex items-center justify-center mx-auto mb-6 text-[#f2efe7] text-2xl font-extrabold">
              ✓
            </div>
            <div className="font-mono text-[11px] tracking-[0.26em] uppercase text-[#a9814e] mb-3">{t.confKicker}</div>
            <h1 className="font-sans font-extrabold text-[28px] md:text-[34px] leading-[1.1] tracking-[-0.02em] mb-2.5">
              {t.thanks} {form.name}
            </h1>
            <p className="text-black/60 mb-8 leading-relaxed">{t.confBody}</p>

            <div className="text-start bg-white border border-black/[0.08] rounded-2xl px-6 py-5 mb-7 flex flex-col gap-3.5">
              <SummaryRow label={t.sumDepart} value={tripSummaryLabel} ltr />
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
          <div className="font-mono text-[11px] tracking-[0.26em] uppercase text-[#a9814e] mb-3.5">{t.resKicker}</div>
          <h1 className="font-sans font-extrabold text-[32px] md:text-[42px] leading-[1.05] tracking-[-0.02em] mb-2">{t.resTitle}</h1>
          <p className="text-black/60">{t.resSub}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* TRAJET */}
          <Section title={t.trajet}>
            {/* Type de trajet */}
            <div dir="ltr" className="flex rounded-xl border border-black/15 overflow-hidden text-sm font-semibold">
              {(["to", "from", "roundtrip"] as TripType[]).map((tt) => (
                <button
                  key={tt}
                  type="button"
                  onClick={() => set("tripType", tt)}
                  className={`flex-1 py-2.5 px-2 transition-colors ${form.tripType === tt ? "bg-[#16181d] text-[#f2efe7]" : "bg-white/60 text-black/60 hover:bg-white"}`}
                >
                  {tt === "to" ? t.tripToLabel : tt === "from" ? t.tripFromLabel : t.tripRoundtripLabel}
                </button>
              ))}
            </div>

            <Field label={form.tripType === "to" ? t.departLabel : form.tripType === "from" ? t.destinationLabel : t.cityLabel}>
              <select required value={form.cityId} onChange={(e) => set("cityId", e.target.value)} className="input">
                <option value="">
                  {form.tripType === "to" ? t.departPrompt : form.tripType === "from" ? t.destinationPrompt : t.cityPrompt}
                </option>
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

            {cityLabel && (
              <div dir="ltr" className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-[#a9814e]/10 border border-[#a9814e]/25 font-sans font-bold text-sm">
                <span className="text-black/80">{form.tripType === "from" ? "Ouman" : cityLabel}</span>
                <span className="text-[#a9814e]">{form.tripType === "roundtrip" ? "⇄" : "→"}</span>
                <span className="text-[#a9814e]">{form.tripType === "from" ? cityLabel : "Ouman"}</span>
              </div>
            )}

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
              <div className="rounded-xl bg-[#16181d] text-[#f2efe7] px-5 py-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/55">{t.priceKicker}</span>
                  <div dir="ltr" className="flex items-baseline gap-2.5">
                    {competitorPrice !== null && (
                      <span className="font-sans font-semibold text-base text-white/40 line-through">{competitorPrice.toLocaleString()} €</span>
                    )}
                    <span className="font-sans font-extrabold text-2xl tracking-[-0.02em] text-[#a9814e]">{price.toLocaleString()} €</span>
                  </div>
                </div>
                {savings !== null && savings > 0 && (
                  <div className="self-end inline-flex items-center gap-1.5 rounded-full bg-[#a9814e] text-[#16181d] font-sans font-bold text-xs px-3 py-1">
                    {t.youSave} {savings.toLocaleString()} €
                  </div>
                )}
                {isRoundtrip && <div className="text-[11px] text-white/40 italic">{t.roundtripNote}</div>}
              </div>
            )}
            {form.cityId && form.vehicleId && price === null && (
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

            {selectedCity?.withPilgrimage && (
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div
                  onClick={() => set("withPilgrimage", !form.withPilgrimage)}
                  className={`w-10 h-6 rounded-full transition-colors relative ${form.withPilgrimage ? "bg-[#a9814e]" : "bg-stone-300"}`}
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

          {form.name && form.email && form.cityId && form.vehicleId && (
            <div className="rounded-xl border border-[#a9814e]/25 bg-[#a9814e]/10 px-5 py-4 text-sm text-black/60 space-y-1">
              <p className="font-semibold text-black/80 mb-2">{t.recap}</p>
              <p dir="ltr" className="text-black/90">{tripSummaryLabel}</p>
              <p>
                {t.sumVehicle} : <span className="text-black/90">{selectedVehicle ? vehicleLabel(selectedVehicle.id, selectedVehicle.label, lang) : ""} ({selectedVehicle?.capacity})</span>
              </p>
              {price && (
                <p>
                  {t.priceKicker} : <span dir="ltr" className="text-[#8a6a3e] font-semibold">{price.toLocaleString()} €</span>
                </p>
              )}
              <p>
                {t.sumRef} : <span className="font-mono text-[#8a6a3e]">{ref}</span>
              </p>
              <p className="text-xs text-black/50 pt-1">{t.depositNote}</p>
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

function SummaryRow({ label, value, mono, ltr }: { label: string; value: string; mono?: boolean; ltr?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-black/50">{label}</span>
      <span dir={ltr ? "ltr" : undefined} className={`font-sans font-semibold text-[15px] text-end ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}
