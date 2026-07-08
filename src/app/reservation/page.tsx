"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { routes, vehicles, getPrice } from "@/data/pricing";

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
      <main className="min-h-screen flex items-center justify-center px-6 bg-[#f5f0e8]">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl text-amber-700">✓</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-stone-800 mb-3">Demande envoyée</h1>
          <p className="text-stone-500 mb-2 text-sm">
            Votre référence : <span className="text-amber-700 font-mono font-bold">{ref}</span>
          </p>
          <p className="text-stone-500 mb-8 text-sm">
            Vous recevrez une confirmation à <span className="text-stone-700">{form.email}</span> sous 24–48h avec le lien de paiement.
          </p>
          {price && (
            <p className="text-stone-400 text-sm mb-8">
              Prix indicatif : <span className="text-amber-700 font-semibold">${price.toLocaleString()}</span>
            </p>
          )}
          <Link href="/" className="text-amber-700 hover:underline text-sm">
            ← Retour à l'accueil
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-12 bg-[#f5f0e8]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-[#f5f0e8]/90 backdrop-blur-md border-b border-stone-200">
        <Link href="/" className="font-serif text-xl font-bold tracking-widest text-stone-800">
          UMAN <span className="text-amber-700">NOW</span>
        </Link>
      </nav>

      <div className="max-w-xl mx-auto pt-16">
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-amber-600/40" />
            <p className="text-xs font-semibold tracking-[0.25em] text-amber-700 uppercase">Réservation</p>
            <div className="h-px w-8 bg-amber-600/40" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-stone-800 mb-1">Demande de transfert</h1>
          <p className="text-stone-400 text-sm">Vers Ouman — Rosh Hashana 5786</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* TRAJET */}
          <Section title="Votre trajet">
            <Field label="Point de départ">
              <select
                required
                value={form.departureId}
                onChange={(e) => set("departureId", e.target.value)}
                className="input"
              >
                <option value="">Choisissez un départ</option>
                {regions.map((region) => (
                  <optgroup key={region} label={region}>
                    {routes
                      .filter((r) => r.region === region)
                      .map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.label}{r.code ? ` (${r.code})` : ""}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </Field>

            <Field label="Type de véhicule">
              <select
                required
                value={form.vehicleId}
                onChange={(e) => set("vehicleId", e.target.value)}
                className="input"
              >
                <option value="">Choisissez un véhicule</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label} — {v.capacity}
                  </option>
                ))}
              </select>
            </Field>

            {/* Prix indicatif */}
            {price !== null && (
              <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-amber-300 bg-amber-50">
                <span className="text-sm text-stone-500">Prix indicatif</span>
                <span className="text-xl font-bold text-amber-700">${price.toLocaleString()}</span>
              </div>
            )}
            {form.departureId && form.vehicleId && price === null && (
              <p className="text-sm text-stone-400 italic">Prix non disponible pour cette combinaison — nous vous contacterons.</p>
            )}

            <Field label="Date souhaitée">
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                className="input"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Passagers">
                <input
                  type="number"
                  min={1}
                  max={80}
                  required
                  placeholder="Ex : 3"
                  value={form.passengers}
                  onChange={(e) => set("passengers", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="Bagages">
                <input
                  type="number"
                  min={0}
                  placeholder="Ex : 4"
                  value={form.luggage}
                  onChange={(e) => set("luggage", e.target.value)}
                  className="input"
                />
              </Field>
            </div>

            {selectedRoute?.withPilgrimage && (
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div
                  onClick={() => set("withPilgrimage", !form.withPilgrimage)}
                  className={`w-10 h-6 rounded-full transition-colors relative ${form.withPilgrimage ? "bg-amber-600" : "bg-stone-300"}`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.withPilgrimage ? "translate-x-5" : "translate-x-1"}`} />
                </div>
                <span className="text-sm text-stone-600">Avec arrêt pèlerinage</span>
              </label>
            )}

            <Field label="Demandes spéciales" optional>
              <textarea
                rows={3}
                placeholder="Enfants, siège bébé, heure précise, etc."
                value={form.specialRequests}
                onChange={(e) => set("specialRequests", e.target.value)}
                className="input resize-none"
              />
            </Field>
          </Section>

          {/* COORDONNÉES */}
          <Section title="Vos coordonnées">
            <Field label="Nom complet">
              <input
                type="text"
                required
                placeholder="Prénom Nom"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                required
                placeholder="vous@email.com"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="WhatsApp">
              <input
                type="tel"
                required
                placeholder="+33 6 00 00 00 00"
                value={form.whatsapp}
                onChange={(e) => set("whatsapp", e.target.value)}
                className="input"
              />
            </Field>
          </Section>

          {/* RÉCAP */}
          {form.name && form.email && form.departureId && form.vehicleId && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-stone-500 space-y-1">
              <p className="font-semibold text-stone-700 mb-2">Récapitulatif</p>
              <p>Départ : <span className="text-stone-800">{selectedRoute?.label}</span></p>
              <p>Véhicule : <span className="text-stone-800">{selectedVehicle?.label} ({selectedVehicle?.capacity})</span></p>
              {price && <p>Prix indicatif : <span className="text-amber-700 font-semibold">${price.toLocaleString()}</span></p>}
              <p>Référence : <span className="text-amber-700 font-mono">{ref}</span></p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-amber-700 text-amber-50 font-semibold text-sm tracking-wide hover:bg-amber-800 transition-colors disabled:opacity-60 shadow-md shadow-amber-900/20"
          >
            {loading ? "Envoi en cours…" : "Envoyer ma demande"}
          </button>

          <p className="text-center text-xs text-stone-400">
            Pas de paiement maintenant. Vous recevrez un lien de paiement après confirmation de disponibilité.
          </p>
        </form>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl border border-stone-200 bg-white shadow-sm">
      <h2 className="text-xs font-semibold tracking-[0.2em] text-amber-700 uppercase">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children, optional }: { label: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-stone-500">
        {label} {optional && <span className="text-stone-300">(optionnel)</span>}
      </label>
      {children}
    </div>
  );
}
