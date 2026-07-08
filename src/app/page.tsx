import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#f5f0e8]">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-[#f5f0e8]/90 backdrop-blur-md border-b border-stone-200">
        <span className="font-serif text-xl font-bold tracking-widest text-stone-800">
          UMAN <span className="text-amber-700">NOW</span>
        </span>
        <Link
          href="/reservation"
          className="px-6 py-2.5 text-sm font-semibold rounded-full bg-amber-700 text-amber-50 hover:bg-amber-800 transition-colors tracking-wide"
        >
          Réserver
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden">
        {/* Fond dégradé chaud */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-100/60 via-[#f5f0e8] to-[#ede6d8] pointer-events-none" />
        {/* Cercle décoratif */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-200/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-amber-600/40" />
            <p className="text-xs font-semibold tracking-[0.3em] text-amber-700 uppercase">
              Rosh Hashana 5786
            </p>
            <div className="h-px w-12 bg-amber-600/40" />
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-stone-800 leading-[1.1] max-w-3xl mb-6">
            Votre transfert privé<br />
            <span className="text-amber-700 italic">vers Ouman</span>
          </h1>

          <p className="text-base md:text-lg text-stone-500 max-w-lg mb-12 leading-relaxed">
            Depuis tous les aéroports d'Europe. Taxi, van, sprinter ou bus.
            Prix transparents, service soigné.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/reservation"
              className="px-9 py-4 text-sm font-semibold rounded-full bg-amber-700 text-amber-50 hover:bg-amber-800 transition-colors tracking-wide shadow-md shadow-amber-900/20"
            >
              Demander un transfert
            </Link>
            <a
              href="#comment-ca-marche"
              className="px-9 py-4 text-sm font-medium rounded-full border border-stone-300 text-stone-600 hover:bg-stone-100 transition-colors tracking-wide"
            >
              Comment ça marche
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-amber-800 grid grid-cols-3">
        {[
          { num: "27+", label: "Points de départ" },
          { num: "7", label: "Types de véhicules" },
          { num: "48h", label: "Réponse garantie" },
        ].map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col items-center justify-center py-10 ${i < 2 ? "border-r border-amber-700" : ""}`}
          >
            <span className="font-serif text-3xl font-bold text-amber-100">{s.num}</span>
            <span className="text-xs text-amber-300/70 mt-1 tracking-wide uppercase">{s.label}</span>
          </div>
        ))}
      </section>

      {/* Comment ça marche */}
      <section id="comment-ca-marche" className="px-6 py-24 max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] text-amber-700 uppercase mb-3">Processus</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800">Simple comme bonjour</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Remplissez le formulaire",
              desc: "Votre départ, vos dates, le nombre de passagers. 2 minutes.",
            },
            {
              step: "02",
              title: "On confirme la dispo",
              desc: "Vous recevez une confirmation par email avec le prix final sous 24–48h.",
            },
            {
              step: "03",
              title: "Paiement & départ",
              desc: "Réglez en ligne par carte. Le chauffeur vous attend à l'heure.",
            },
          ].map((item) => (
            <div key={item.step} className="relative flex flex-col gap-4 p-8 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-serif text-5xl font-bold text-amber-200">{item.step}</span>
              <h3 className="text-base font-semibold text-stone-800">{item.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Véhicules */}
      <section className="px-6 py-24 bg-[#ede8df]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.25em] text-amber-700 uppercase mb-3">Flotte</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800">Pour tous les groupes</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Taxi / Berline", cap: "1–4 pax", icon: "🚘" },
              { label: "Jeep / SUV", cap: "1–4 pax", icon: "🚙" },
              { label: "Minivan", cap: "5–7 pax", icon: "🚐" },
              { label: "Sprinter", cap: "15 pax", icon: "🚌" },
              { label: "Midibus", cap: "29 pax", icon: "🚌" },
              { label: "Autocar", cap: "50 pax", icon: "🚍" },
              { label: "Grand car", cap: "80 pax", icon: "🚍" },
              { label: "VIP / Business", cap: "sur demande", icon: "⭐" },
            ].map((v) => (
              <div
                key={v.label}
                className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-white border border-stone-200 text-center hover:border-amber-400 hover:shadow-md transition-all cursor-default"
              >
                <span className="text-3xl">{v.icon}</span>
                <span className="text-sm font-semibold text-stone-700">{v.label}</span>
                <span className="text-xs text-stone-400">{v.cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-6 py-24 text-center bg-[#f5f0e8]">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10 bg-amber-600/30" />
            <span className="text-xs font-semibold tracking-[0.25em] text-amber-700 uppercase">Réservation</span>
            <div className="h-px w-10 bg-amber-600/30" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 mb-4">
            Prêt à partir vers Ouman ?
          </h2>
          <p className="text-stone-500 mb-10 leading-relaxed">
            Faites votre demande en 2 minutes. Réponse sous 48h, sans engagement.
          </p>
          <Link
            href="/reservation"
            className="inline-block px-10 py-4 text-sm font-semibold rounded-full bg-amber-700 text-amber-50 hover:bg-amber-800 transition-colors tracking-wide shadow-md shadow-amber-900/20"
          >
            Demander un transfert
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-stone-200 text-center bg-[#ede8df]">
        <p className="text-stone-400 text-xs tracking-wide">© 2025 Uman Now — Transferts privés vers Ouman</p>
      </footer>
    </main>
  );
}
