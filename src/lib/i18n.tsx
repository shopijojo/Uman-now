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
      "Depuis tous les aéroports d'Europe. Taxi, van, sprinter ou autocar. Prix transparents, service soigné, réponse garantie sous 24h.",
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
    s2b: "Vous recevez une confirmation par email ou WhatsApp avec le prix final sous 24h.",
    s3t: "Paiement & départ",
    s3b: "Réglez un acompte de 20% minimum par carte ou virement (ou la totalité) pour valider. Le chauffeur vous attend à l'heure convenue.",
    fleetKicker: "Flotte",
    fleetTitle: "Pour tous les groupes",
    pax: "Passagers",
    onDemand: "Sur demande",
    business: "Business",
    ctaPre: "Prêt à partir vers",
    ctaAccent: "Ouman",
    ctaPost: "?",
    ctaSub: "Faites votre demande en 2 minutes. Réponse sous 24h, sans engagement.",
    footer: "© 2025 Uman Now — Transferts privés vers Ouman",
    resKicker: "Réservation",
    resTitle: "Demande de transfert",
    resSub: "Vers Ouman — Rosh Hashana 5786",
    trajet: "Votre trajet",
    tripToLabel: "Aller vers Ouman",
    tripFromLabel: "Retour depuis Ouman",
    tripRoundtripLabel: "Aller-retour",
    departLabel: "Point de départ",
    departPrompt: "Choisissez un départ",
    destinationLabel: "Point de destination",
    destinationPrompt: "Choisissez une destination",
    cityLabel: "Ville (aller-retour)",
    cityPrompt: "Choisissez une ville",
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
    priceNote: "Prix final confirmé sous 24h",
    roundtripNote: "Estimation aller-retour (aller simple × 2)",
    youSave: "Vous économisez",
    depositNote: "Acompte de 20% minimum requis (carte ou virement) pour valider la réservation.",
    submit: "Envoyer ma demande",
    submitting: "Envoi en cours…",
    reassure: "Un acompte de 20% minimum (carte bleue ou virement bancaire) est nécessaire pour valider votre réservation. Le solde peut être réglé avant le départ.",
    confKicker: "Demande envoyée",
    thanks: "Merci",
    confBody: "Notre équipe vous répond sous 24h avec le prix final. Un acompte de 20% minimum (carte ou virement) confirmera votre réservation.",
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
      "מכל שדות התעופה באירופה. מונית, ואן, ספרינטר או אוטובוס. מחירים שקופים, שירות מוקפד, מענה מובטח תוך 24 שעות.",
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
    s2b: "תקבלו אישור במייל או בוואטסאפ עם המחיר הסופי תוך 24 שעות.",
    s3t: "תשלום ויציאה",
    s3b: "שלמו מקדמה של 20% לפחות בכרטיס או בהעברה בנקאית (או הסכום המלא) כדי לאשר. הנהג ממתין לכם בזמן שנקבע.",
    fleetKicker: "צי הרכבים",
    fleetTitle: "לכל גודל קבוצה",
    pax: "נוסעים",
    onDemand: "לפי דרישה",
    business: "עסקים",
    ctaPre: "מוכנים לצאת",
    ctaAccent: "לאומן",
    ctaPost: "?",
    ctaSub: "הגישו בקשה בשתי דקות. מענה תוך 24 שעות, ללא התחייבות.",
    footer: "© 2025 אומן נאו — הסעות פרטיות לאומן",
    resKicker: "הזמנה",
    resTitle: "בקשת הסעה",
    resSub: "לאומן — ראש השנה 5786",
    trajet: "המסלול שלכם",
    tripToLabel: "הלוך לאומן",
    tripFromLabel: "חזור מאומן",
    tripRoundtripLabel: "הלוך ושוב",
    departLabel: "נקודת יציאה",
    departPrompt: "בחרו נקודת יציאה",
    destinationLabel: "נקודת יעד",
    destinationPrompt: "בחרו יעד",
    cityLabel: "עיר (הלוך ושוב)",
    cityPrompt: "בחרו עיר",
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
    priceNote: "מחיר סופי יאושר תוך 24 שעות",
    roundtripNote: "אומדן הלוך ושוב (הלוך × 2)",
    youSave: "אתם חוסכים",
    depositNote: "נדרשת מקדמה של 20% לפחות (כרטיס או העברה) לאישור ההזמנה.",
    submit: "שליחת הבקשה",
    submitting: "שולח…",
    reassure: "נדרשת מקדמה של 20% לפחות (כרטיס אשראי או העברה בנקאית) לאישור ההזמנה. את היתרה ניתן לשלם לפני היציאה.",
    confKicker: "הבקשה נשלחה",
    thanks: "תודה",
    confBody: "הצוות שלנו יחזור אליכם תוך 24 שעות עם המחיר הסופי. מקדמה של 20% לפחות (כרטיס או העברה) תאשר את ההזמנה.",
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
  minivan: "מיניוואן",
  sprinter: "ספרינטר",
  midibus: "מידיבוס",
  autocar: "אוטובוס",
  grandcar: "אוטובוס גדול",
};

export const FLEET_ORDER = ["taxi", "minivan", "sprinter", "midibus", "autocar", "grandcar"] as const;

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
