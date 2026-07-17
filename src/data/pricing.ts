export type VehicleType = {
  id: string
  label: string
  capacity: string
  pax: number
}

export type Route = {
  id: number
  region: string
  label: string
  code?: string
  prices: Record<string, number | null>
  withPilgrimage?: Record<string, number | null>
  // Prix concurrence — affiché barré face à notre prix.
  competitorPrices?: Record<string, number | null>
}

export const vehicles: VehicleType[] = [
  { id: "taxi", label: "Taxi / Berline", capacity: "1–4 pax", pax: 4 },
  { id: "minivan", label: "Minivan", capacity: "5–7 pax", pax: 7 },
  { id: "sprinter", label: "Sprinter", capacity: "15 pax", pax: 15 },
  { id: "midibus", label: "Midibus", capacity: "29 pax", pax: 29 },
  { id: "autocar", label: "Autocar", capacity: "50 pax", pax: 50 },
  { id: "grandcar", label: "Grand car", capacity: "80 pax", pax: 80 },
]

export const routes: Route[] = [
  // AÉROPORTS – MOLDAVIE
  {
    id: 1, region: "Aéroports – Moldavie", label: "Chișinău", code: "KIV",
    prices: { taxi: 500, minivan: 800, sprinter: 1200, midibus: 1500, autocar: 2000, grandcar: 2600 },
    competitorPrices: { taxi: 550, minivan: 900, sprinter: 1500, midibus: 2100, autocar: 2300, grandcar: 3000 },
  },
  // AÉROPORTS – ROUMANIE
  {
    id: 2, region: "Aéroports – Roumanie", label: "Iași", code: "IAS",
    prices: { taxi: 550, minivan: 800, sprinter: 1300, midibus: 2000, autocar: 2200, grandcar: 2750 },
    competitorPrices: { taxi: 650, minivan: 1000, sprinter: 1700, midibus: 2400, autocar: 2600, grandcar: 3200 },
  },
  {
    id: 3, region: "Aéroports – Roumanie", label: "Suceava", code: "SCV",
    prices: { taxi: 600, minivan: 800, sprinter: 1400, midibus: 2000, autocar: 2100, grandcar: 2800 },
    competitorPrices: { taxi: 700, minivan: 1000, sprinter: 1800, midibus: 2400, autocar: 2600, grandcar: 3300 },
  },
  {
    id: 4, region: "Aéroports – Roumanie", label: "Bacău", code: "BCM",
    prices: { taxi: 800, minivan: 1000, sprinter: 2000, midibus: 2350, autocar: 2650, grandcar: 3550 },
    competitorPrices: { taxi: 900, minivan: 1300, sprinter: 2600, midibus: 2900, autocar: 3200, grandcar: 4200 },
  },
  {
    id: 5, region: "Aéroports – Roumanie", label: "Tulcea", code: "TCE",
    prices: { taxi: 800, minivan: 1000, sprinter: 2020, midibus: 2380, autocar: 2650, grandcar: 3550 },
    competitorPrices: { taxi: 900, minivan: 1300, sprinter: 2600, midibus: 2900, autocar: 3200, grandcar: 4200 },
  },
  {
    id: 6, region: "Aéroports – Roumanie", label: "Cluj-Napoca", code: "CLJ",
    prices: { taxi: 970, minivan: 1600, sprinter: 2420, midibus: 3180, autocar: 3950, grandcar: 4950 },
    competitorPrices: { taxi: 1250, minivan: 2000, sprinter: 3100, midibus: 3900, autocar: 4800, grandcar: 6000 },
  },
  {
    id: 7, region: "Aéroports – Roumanie", label: "Bucarest – Otopeni", code: "OTP",
    prices: { taxi: 1070, minivan: 1150, sprinter: 2220, midibus: 2780, autocar: 3350, grandcar: 4250 },
    competitorPrices: { taxi: 1300, minivan: 1700, sprinter: 2800, midibus: 3400, autocar: 4100, grandcar: 5100 },
  },
  // AÉROPORTS – POLOGNE
  {
    id: 8, region: "Aéroports – Pologne", label: "Rzeszów", code: "RZE",
    prices: { taxi: 770, minivan: 1150, sprinter: 2020, midibus: 2380, autocar: 2950, grandcar: 3450 },
    competitorPrices: { taxi: 1000, minivan: 1500, sprinter: 2600, midibus: 3100, autocar: 3600, grandcar: 4500 },
  },
  {
    id: 9, region: "Aéroports – Pologne", label: "Cracovie", code: "KRK",
    prices: { taxi: 920, minivan: 1450, sprinter: 2220, midibus: 2680, autocar: 3750, grandcar: 4450 },
    competitorPrices: { taxi: 1150, minivan: 1800, sprinter: 2900, midibus: 3400, autocar: 4450, grandcar: 5500 },
  },
  {
    id: 10, region: "Aéroports – Pologne", label: "Varsovie", code: "WAW",
    prices: { taxi: 970, minivan: 1550, sprinter: 2520, midibus: 3080, autocar: 4150, grandcar: 4950 },
    competitorPrices: { taxi: 1250, minivan: 2000, sprinter: 3200, midibus: 3800, autocar: 4800, grandcar: 6000 },
  },
  {
    id: 11, region: "Aéroports – Pologne", label: "Katowice", code: "KTW",
    prices: { taxi: 970, minivan: 1550, sprinter: 2520, midibus: 3080, autocar: 4150, grandcar: 4950 },
    competitorPrices: { taxi: 1250, minivan: 2000, sprinter: 3200, midibus: 3800, autocar: 4800, grandcar: 6000 },
  },
  // AÉROPORTS – HONGRIE
  {
    id: 12, region: "Aéroports – Hongrie", label: "Budapest", code: "BUD",
    prices: { taxi: 1020, minivan: 1750, sprinter: 3020, midibus: 3380, autocar: 4650, grandcar: 5750 },
    competitorPrices: { taxi: 1400, minivan: 2300, sprinter: 3700, midibus: 4200, autocar: 5500, grandcar: 6900 },
  },
  {
    id: 13, region: "Aéroports – Hongrie", label: "Debrecen", code: "DEB",
    prices: { taxi: 870, minivan: 1150, sprinter: 2420, midibus: 2680, autocar: 3650, grandcar: 4450 },
    competitorPrices: { taxi: 1100, minivan: 1800, sprinter: 3000, midibus: 3600, autocar: 4400, grandcar: 5400 },
  },
  // AÉROPORTS – BULGARIE
  {
    id: 14, region: "Aéroports – Bulgarie", label: "Varna", code: "VAR",
    prices: { taxi: 920, minivan: 1150, sprinter: 2520, midibus: 3080, autocar: 3850, grandcar: 4950 },
    competitorPrices: { taxi: 1250, minivan: 2000, sprinter: 3200, midibus: 3800, autocar: 4800, grandcar: 6000 },
  },
  {
    id: 15, region: "Aéroports – Bulgarie", label: "Burgas", code: "BOJ",
    prices: { taxi: 1120, minivan: 1250, sprinter: 2520, midibus: 3080, autocar: 3850, grandcar: 4950 },
    competitorPrices: { taxi: 1250, minivan: 2000, sprinter: 3200, midibus: 3800, autocar: 4800, grandcar: 6000 },
  },
  {
    id: 16, region: "Aéroports – Bulgarie", label: "Sofia", code: "SOF",
    prices: { taxi: 1120, minivan: 2050, sprinter: 3020, midibus: 3980, autocar: 4850, grandcar: 6450 },
    competitorPrices: { taxi: 1500, minivan: 2500, sprinter: 3850, midibus: 4900, autocar: 6000, grandcar: 7500 },
  },
  // AÉROPORTS – AUTRICHE
  {
    id: 17, region: "Aéroports – Autriche", label: "Vienne", code: "VIE",
    prices: { taxi: 1120, minivan: 2150, sprinter: 3220, midibus: 4280, autocar: 5350, grandcar: 6450 },
    competitorPrices: { taxi: 1500, minivan: 2600, sprinter: 4000, midibus: 5200, autocar: 6250, grandcar: 7800 },
  },
  // FRONTIÈRES TERRESTRES
  {
    id: 18, region: "Frontières terrestres", label: "Frontière Mohyliv", code: "Moldavie/UA",
    prices: { taxi: 250, minivan: 400, sprinter: 620, midibus: 980, autocar: 1150, grandcar: 1430 },
    competitorPrices: { taxi: 270, minivan: 500, sprinter: 800, midibus: 1100, autocar: 1200, grandcar: 1450 },
  },
  {
    id: 19, region: "Frontières terrestres", label: "Frontière Palanca", code: "Moldavie/UA",
    prices: { taxi: 320, minivan: 450, sprinter: 770, midibus: 1080, autocar: 1250, grandcar: 1550 },
    competitorPrices: { taxi: 350, minivan: 600, sprinter: 1000, midibus: 1300, autocar: 1500, grandcar: 2000 },
  },
  {
    id: 20, region: "Frontières terrestres", label: "Frontière Siret", code: "Roumanie/UA",
    prices: { taxi: 520, minivan: 650, sprinter: 1020, midibus: 1180, autocar: 1350, grandcar: 1650 },
    competitorPrices: { taxi: 600, minivan: 1000, sprinter: 1600, midibus: 2000, autocar: 2400, grandcar: 3300 },
  },
  {
    id: 21, region: "Frontières terrestres", label: "Frontière Shehyni", code: "Pologne/UA",
    prices: { taxi: 670, minivan: 800, sprinter: 1120, midibus: 1380, autocar: 1650, grandcar: 1950 },
    competitorPrices: { taxi: 800, minivan: 1300, sprinter: 2000, midibus: 2500, autocar: 3100, grandcar: 4200 },
  },
  {
    id: 23, region: "Frontières terrestres", label: "Frontières Hongrie", code: "HU/UA",
    prices: { taxi: 820, minivan: 950, sprinter: 1220, midibus: 1580, autocar: 1850, grandcar: 2150 },
    competitorPrices: { taxi: 1000, minivan: 1500, sprinter: 2600, midibus: 3100, autocar: 3600, grandcar: 4500 },
  },
  // GARES / VILLES (UKRAINE)
  {
    id: 24, region: "Gares / Villes (Ukraine)", label: "Vinnytsia – gare",
    prices: { taxi: 190, minivan: 330, sprinter: 470, midibus: 630, autocar: 800, grandcar: 1080 },
    competitorPrices: { taxi: 210, minivan: 350, sprinter: 550, midibus: 650, autocar: 850, grandcar: 1100 },
  },
  {
    id: 25, region: "Gares / Villes (Ukraine)", label: "Bila Tserkva – gare",
    prices: { taxi: 130, minivan: 230, sprinter: 360, midibus: 430, autocar: 580, grandcar: 780 },
    competitorPrices: { taxi: 150, minivan: 250, sprinter: 380, midibus: 450, autocar: 600, grandcar: 800 },
  },
  {
    id: 26, region: "Gares / Villes (Ukraine)", label: "Khmelnytskyï – gare",
    prices: { taxi: 300, minivan: 360, sprinter: 500, midibus: 660, autocar: 850, grandcar: 1150 },
    competitorPrices: { taxi: 350, minivan: 600, sprinter: 950, midibus: 1100, autocar: 1450, grandcar: 1800 },
  },
  {
    id: 27, region: "Gares / Villes (Ukraine)", label: "Kyiv – gare",
    prices: { taxi: 280, minivan: 360, sprinter: 500, midibus: 660, autocar: 850, grandcar: 1150 },
    competitorPrices: { taxi: 300, minivan: 500, sprinter: 800, midibus: 900, autocar: 1200, grandcar: 1500 },
  },
]

export function getPrice(routeId: number, vehicleId: string, withPilgrimage = false): number | null {
  const route = routes.find(r => r.id === routeId)
  if (!route) return null
  if (withPilgrimage && route.withPilgrimage) {
    return route.withPilgrimage[vehicleId] ?? route.prices[vehicleId] ?? null
  }
  return route.prices[vehicleId] ?? null
}

export function getCompetitorPrice(routeId: number, vehicleId: string): number | null {
  const route = routes.find(r => r.id === routeId)
  if (!route?.competitorPrices) return null
  return route.competitorPrices[vehicleId] ?? null
}
