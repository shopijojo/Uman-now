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
}

export const vehicles: VehicleType[] = [
  { id: "taxi", label: "Taxi / Berline", capacity: "1–4 pax", pax: 4 },
  { id: "jeep", label: "Jeep", capacity: "1–4 pax", pax: 4 },
  { id: "minivan", label: "Minivan", capacity: "5–7 pax", pax: 7 },
  { id: "sprinter", label: "Sprinter", capacity: "15 pax", pax: 15 },
  { id: "midibus", label: "Midibus", capacity: "29 pax", pax: 29 },
  { id: "autocar", label: "Autocar", capacity: "50 pax", pax: 50 },
  { id: "grandcar", label: "Grand car", capacity: "80 pax", pax: 80 },
]

export const routes: Route[] = [
  // MOLDAVIE
  {
    id: 1, region: "Aéroports – Moldavie", label: "Chișinău", code: "KIV",
    prices: { taxi: 550, jeep: 750, minivan: 900, sprinter: 1500, midibus: 2100, autocar: 2300, grandcar: 3000 },
    withPilgrimage: { taxi: 680, jeep: 910, minivan: 1100, sprinter: 1850, midibus: 2550, autocar: 2800, grandcar: 3650 },
  },
  // ROUMANIE
  {
    id: 2, region: "Aéroports – Roumanie", label: "Iași", code: "IAS",
    prices: { taxi: 650, jeep: 800, minivan: 1000, sprinter: 1700, midibus: 2400, autocar: 2600, grandcar: 3200 },
    withPilgrimage: { taxi: 780, jeep: 960, minivan: 1200, sprinter: 2050, midibus: 2850, autocar: 3100, grandcar: 3850 },
  },
  {
    id: 3, region: "Aéroports – Roumanie", label: "Suceava", code: "SCV",
    prices: { taxi: 700, jeep: 850, minivan: 1000, sprinter: 1800, midibus: 2400, autocar: 2600, grandcar: 3300 },
  },
  {
    id: 4, region: "Aéroports – Roumanie", label: "Bacău", code: "BCM",
    prices: { taxi: 900, jeep: 1100, minivan: 1300, sprinter: 2600, midibus: 2900, autocar: 3200, grandcar: 4200 },
  },
  {
    id: 5, region: "Aéroports – Roumanie", label: "Tulcea", code: "TCE",
    prices: { taxi: 900, jeep: 1100, minivan: 1300, sprinter: 2600, midibus: 2900, autocar: 3200, grandcar: 4200 },
    withPilgrimage: { taxi: 1100, jeep: 1350, minivan: 1600, sprinter: 3100, midibus: 3500, autocar: 3950, grandcar: 5200 },
  },
  {
    id: 6, region: "Aéroports – Roumanie", label: "Cluj-Napoca", code: "CLJ",
    prices: { taxi: 1250, jeep: 1450, minivan: 2000, sprinter: 3100, midibus: 3900, autocar: 4800, grandcar: 6000 },
  },
  {
    id: 7, region: "Aéroports – Roumanie", label: "Bucarest – Otopeni", code: "OTP",
    prices: { taxi: 1300, jeep: 1400, minivan: 1700, sprinter: 2800, midibus: 3400, autocar: 4100, grandcar: 5100 },
    withPilgrimage: { taxi: 1100, jeep: 1650, minivan: 2000, sprinter: 3300, midibus: 4000, autocar: 4850, grandcar: 6100 },
  },
  // POLOGNE
  {
    id: 8, region: "Aéroports – Pologne", label: "Rzeszów", code: "RZE",
    prices: { taxi: 1000, jeep: 1200, minivan: 1500, sprinter: 2600, midibus: 3100, autocar: 3600, grandcar: 4500 },
  },
  {
    id: 9, region: "Aéroports – Pologne", label: "Cracovie", code: "KRK",
    prices: { taxi: 1150, jeep: 1300, minivan: 1800, sprinter: 2900, midibus: 3400, autocar: 4450, grandcar: 5500 },
  },
  {
    id: 10, region: "Aéroports – Pologne", label: "Varsovie", code: "WAW",
    prices: { taxi: 1250, jeep: 1500, minivan: 2000, sprinter: 3200, midibus: 3800, autocar: 4800, grandcar: 6000 },
  },
  {
    id: 11, region: "Aéroports – Pologne", label: "Katowice", code: "KTW",
    prices: { taxi: 1250, jeep: 1500, minivan: 2000, sprinter: 3200, midibus: 3800, autocar: 4800, grandcar: 6000 },
  },
  // HONGRIE
  {
    id: 12, region: "Aéroports – Hongrie", label: "Budapest", code: "BUD",
    prices: { taxi: 1400, jeep: 1650, minivan: 2300, sprinter: 3700, midibus: 4200, autocar: 5500, grandcar: 6900 },
  },
  {
    id: 13, region: "Aéroports – Hongrie", label: "Debrecen", code: "DEB",
    prices: { taxi: 1100, jeep: 1350, minivan: 1800, sprinter: 3000, midibus: 3600, autocar: 4400, grandcar: 5400 },
  },
  // BULGARIE
  {
    id: 14, region: "Aéroports – Bulgarie", label: "Varna", code: "VAR",
    prices: { taxi: 1250, jeep: 1450, minivan: 2000, sprinter: 3200, midibus: 3800, autocar: 4800, grandcar: 6000 },
    withPilgrimage: { taxi: 1450, jeep: 1700, minivan: 2300, sprinter: 3700, midibus: 4400, autocar: 5550, grandcar: 7000 },
  },
  {
    id: 15, region: "Aéroports – Bulgarie", label: "Burgas", code: "BOJ",
    prices: { taxi: 1250, jeep: 1450, minivan: 2000, sprinter: 3200, midibus: 3800, autocar: 4800, grandcar: 6000 },
    withPilgrimage: { taxi: 1450, jeep: 1700, minivan: 2300, sprinter: 3700, midibus: 4400, autocar: 5550, grandcar: 7000 },
  },
  {
    id: 16, region: "Aéroports – Bulgarie", label: "Sofia", code: "SOF",
    prices: { taxi: 1500, jeep: 1850, minivan: 2500, sprinter: 3850, midibus: 4900, autocar: 6000, grandcar: 7500 },
    withPilgrimage: { taxi: 1700, jeep: 2100, minivan: 2800, sprinter: 4350, midibus: 5500, autocar: 6750, grandcar: 8500 },
  },
  // AUTRICHE
  {
    id: 17, region: "Aéroports – Autriche", label: "Vienne", code: "VIE",
    prices: { taxi: 1500, jeep: 1850, minivan: 2600, sprinter: 4000, midibus: 5200, autocar: 6250, grandcar: 7800 },
  },
  // FRONTIÈRES TERRESTRES
  {
    id: 18, region: "Frontières terrestres", label: "Frontière Mohyliv", code: "Moldavie/UA",
    prices: { taxi: 270, jeep: 400, minivan: 500, sprinter: 800, midibus: 1100, autocar: 1200, grandcar: 1450 },
  },
  {
    id: 19, region: "Frontières terrestres", label: "Frontière Palanca", code: "Moldavie/UA",
    prices: { taxi: 350, jeep: 500, minivan: 600, sprinter: 1000, midibus: 1300, autocar: 1500, grandcar: 2000 },
  },
  {
    id: 20, region: "Frontières terrestres", label: "Frontière Siret", code: "Roumanie/UA",
    prices: { taxi: 600, jeep: 800, minivan: 1000, sprinter: 1600, midibus: 2000, autocar: 2400, grandcar: 3300 },
  },
  {
    id: 21, region: "Frontières terrestres", label: "Frontière Shehyni", code: "Pologne/UA",
    prices: { taxi: 800, jeep: 950, minivan: 1300, sprinter: 2000, midibus: 2500, autocar: 3100, grandcar: 4200 },
  },
  {
    id: 23, region: "Frontières terrestres", label: "Frontières Hongrie", code: "HU/UA",
    prices: { taxi: 1000, jeep: 1200, minivan: 1500, sprinter: 2600, midibus: 3100, autocar: 3600, grandcar: 4500 },
  },
  // UKRAINE
  {
    id: 24, region: "Gares / Villes (Ukraine)", label: "Vinnytsia – gare",
    prices: { taxi: 210, jeep: 280, minivan: 350, sprinter: 550, midibus: 650, autocar: 850, grandcar: 1100 },
  },
  {
    id: 25, region: "Gares / Villes (Ukraine)", label: "Bila Tserkva – gare",
    prices: { taxi: 150, jeep: 200, minivan: 250, sprinter: 380, midibus: 450, autocar: 600, grandcar: 800 },
  },
  {
    id: 26, region: "Gares / Villes (Ukraine)", label: "Khmelnytskyï – gare",
    prices: { taxi: 350, jeep: 450, minivan: 600, sprinter: 950, midibus: 1100, autocar: 1450, grandcar: 1800 },
  },
  {
    id: 27, region: "Gares / Villes (Ukraine)", label: "Kyiv – gare",
    prices: { taxi: 300, jeep: 400, minivan: 500, sprinter: 800, midibus: 900, autocar: 1200, grandcar: 1500 },
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
