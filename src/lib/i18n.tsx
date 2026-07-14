"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "fr" | "he";

export const DICT = {
  fr: {
    dir: "ltr" as const,
    how: "Comment ça marche",
    fleetNav: "Flotte",
    reserve: "Réserver",
    badge: "Rosh Hashana 5786",
    heroPre: "Votre transfert privé vers",
    heroAccent: "Ouman",
    heroSub:
      "Depuis tous les aéroports d'Europe. Taxi, van, sprinter ou autocar. Prix transparents, service soigné, réponse garantie sous 48h.",
    btnPrimary: "Demander un transfert",
    btnSecondary: "Comment ça marche",
    statA: "Points de départ",
    statB: "Types de véhicules",
    statC: "Réponse garantie",
    procKicker: "Processus",
    procTitle: "Simple comme bonjour",
    s1t: "Remplissez le formulaire",
    s1b: "Votre départ, vos dates, le nombre de passagers. 2 minutes suffisent.",
    s2t: "On confirme la dispo",
    s2b: "Vous recevez une confirmation par email avec le prix final sous 24–48h.",
    s3t: "Paiement & départ",
    s3b: "Réglez en ligne par carte. Le chauffeur vous attend à l'heure convenue.",
    fleetKicker: "Flotte",
    fleetTitle: "Pour tous les groupes",
    pax: "Passagers",
    onDemand: "Sur demande",
    business: "Business",
    ctaPre: "Prêt à partir vers",
    ctaAccent: "Ouman",
    ctaPost: "?",
    ctaSub: "Faites votre demande en 2 minutes. Réponse sous 48h, sans engagement.",
    footer: "© 2025 Uman Now — Transferts privés vers Ouman",
    resKicker: "Réservation",
    resTitle: "Demande de transfert",
    resSub: "Vers Ouman — Rosh Hashana 5786",
    trajet: "Votre trajet",
    departLabel: "Point de départ",
    departPrompt: "Choisissez un départ",
    vehicleLabel: "Type de véhicule",
    vehiclePrompt: "Choisissez un véhicule",
    dateLabel: "Date souhaitée",
    paxLabel: "Passagers",
    bagsLabel: "Bagages",
    pilgrimageLabel: "Avec arrêt pèlerinage",
    specialLabel: "Demandes spéciales",
    specialOptional: "(optionnel)",
    specialPh: "Enfants, siège bébé, heure précise, etc.",
    contact: "Vos coordonnées",
    nameLabel: "Nom complet",
    namePh: "Prénom Nom",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
    priceKicker: "Prix indicatif",
    priceUnavailable: "Prix non disponible pour cette combinaison — nous vous contacterons.",
    priceNote: "Prix final confirmé sous 48h",
    submit: "Envoyer ma demande",
    submitting: "Envoi en cours…",
    reassure: "Pas de paiement maintenant. Vous recevrez un lien de paiement après confirmation de disponibilité.",
    confKicker: "Demande envoyée",
    thanks: "Merci",
    confBody: "Notre équipe vous répond sous 48h avec le prix final et un lien de paiement.",
    sumDepart: "Départ",
    sumVehicle: "Véhicule",
    sumDate: "Date",
    sumPax: "Passagers",
    sumRef: "Référence",
    backHome: "Retour à l'accueil",
    recap: "Récapitulatif",
  },
  he: {
    dir: "rtl" as const,
    how: "איך זה עובד",
    fleetNav: "צי הרכבים",
    reserve: "להזמנה",
    badge: "ראש השנה 5786",
    heroPre: "ההסעה הפרטית שלכם",
    heroAccent: "לאומן",
    heroSub:
      "מכל שדות התעופה באירופה. מונית, ואן, ספרינטר או אוטובוס. מחירים שקופים, שירות מוקפד, מענה מובטח תוך 48 שעות.",
    btnPrimary: "בקשת הסעה",
    btnSecondary: "איך זה עובד",
    statA: "נקודות יציאה",
    statB: "סוגי רכבים",
    statC: "מענה מובטח",
    procKicker: "התהליך",
    procTitle: "פשוט לגמרי",
    s1t: "מלאו את הטופס",
    s1b: "נקודת היציאה, התאריכים ומספר הנוסעים. שתי דקות ותסיימו.",
    s2t: "אנחנו מאשרים זמינות",
    s2b: "תקבלו אישור במייל עם המחיר הסופי תוך 24–48 שעות.",
    s3t: "תשלום ויציאה",
    s3b: "משלמים אונליין בכרטיס. הנהג ממתין לכם בזמן שנקבע.",
    fleetKicker: "צי הרכבים",
    fleetTitle: "לכל גודל קבוצה",
    pax: "נוסעים",
    onDemand: "לפי דרישה",
    business: "עסקים",
    ctaPre: "מוכנים לצאת",
    ctaAccent: "לאומן",
    ctaPost: "?",
    ctaSub: "הגישו בקשה בשתי דקות. מענה תוך 48 שעות, ללא התחייבות.",
    footer: "© 2025 אומן נאו — הסעות פרטיות לאומן",
    resKicker: "הזמנה",
    resTitle: "בקשת הסעה",
    resSub: "לאומן — ראש השנה 5786",
    trajet: "המסלול שלכם",
    departLabel: "נקודת יציאה",
    departPrompt: "בחרו נקודת יציאה",
    vehicleLabel: "סוג רכב",
    vehiclePrompt: "בחרו רכב",
    dateLabel: "תאריך מבוקש",
    paxLabel: "נוסעים",
    bagsLabel: "מזוודות",
    pilgrimageLabel: "עם עצירה לעליה לקבר",
    specialLabel: "בקשות מיוחדות",
    specialOptional: "(רשות)",
    specialPh: "ילדים, מושב לתינוק, שעה מדויקת וכו׳",
    contact: "פרטי קשר",
    nameLabel: "שם מלא",
    namePh: "שם פרטי ומשפחה",
    emailLabel: "אימייל",
    whatsappLabel: "וואטסאפ",
    priceKicker: "מחיר משוער",
    priceUnavailable: "מחיר לא זמין לשילוב הזה — ניצור איתכם קשר.",
    priceNote: "מחיר סופי יאושר תוך 48 שעות",
    submit: "שליחת הבקשה",
    submitting: "שולח…",
    reassure: "אין תשלום כעת. תקבלו קישור לתשלום לאחר אישור הזמינות.",
    confKicker: "הבקשה נשלחה",
    thanks: "תודה",
    confBody: "הצוות שלנו יחזור אליכם תוך 48 שעות עם המחיר הסופי וקישור לתשלום.",
    sumDepart: "יציאה",
    sumVehicle: "רכב",
    sumDate: "תאריך",
    sumPax: "נוסעים",
    sumRef: "מספר אסמכתא",
    backHome: "חזרה לדף הבית",
    recap: "סיכום",
  },
} as const;

export const REGION_HE: Record<string, string> = {
  "Aéroports – Moldavie": "שדות תעופה – מולדובה",
  "Aéroports – Roumanie": "שדות תעופה – רומניה",
  "Aéroports – Pologne": "שדות תעופה – פולין",
  "Aéroports – Hongrie": "שדות תעופה – הונגריה",
  "Aéroports – Bulgarie": "שדות תעופה – בולגריה",
  "Aéroports – Autriche": "שדות תעופה – אוסטריה",
  "Frontières terrestres": "מעברי גבול יבשתיים",
  "Gares / Villes (Ukraine)": "תחנות / ערים (אוקראינה)",
};

export const VEHICLE_HE: Record<string, string> = {
  taxi: "מונית / סדאן",
  jeep: "ג'יפ",
  minivan: "מיניוואן",
  sprinter: "ספרינטר",
  midibus: "מידיבוס",
  autocar: "אוטובוס",
  grandcar: "אוטובוס גדול",
};

export const FLEET_ORDER = ["taxi", "jeep", "minivan", "sprinter", "midibus", "autocar", "grandcar"] as const;

type Dict = { [K in keyof typeof DICT["fr"]]: string };

const LangContext = createContext<{
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
}>({ lang: "fr", t: DICT.fr, setLang: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("uman-lang") : null;
    if (saved === "fr" || saved === "he") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem("uman-lang", l);
  };

  const t = DICT[lang];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  return <LangContext.Provider value={{ lang, t, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

export function regionLabel(region: string, lang: Lang) {
  return lang === "he" ? REGION_HE[region] ?? region : region;
}

export function vehicleLabel(id: string, fallback: string, lang: Lang) {
  return lang === "he" ? VEHICLE_HE[id] ?? fallback : fallback;
}
