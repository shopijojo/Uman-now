import { NextResponse } from "next/server";

export type ReservationPayload = {
  ref: string;
  tripSummary: string;
  vehicle: string;
  date: string;
  passengers: string;
  luggage: string;
  withPilgrimage: boolean;
  specialRequests: string;
  name: string;
  email: string;
  whatsapp: string;
  price: number | null;
};

async function sendEmail(data: ReservationPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!apiKey || !to) return { skipped: true };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.NOTIFY_EMAIL_FROM || "Uman Now <onboarding@resend.dev>",
      to: [to],
      subject: `Nouvelle demande — ${data.ref} — ${data.name}`,
      text: formatText(data),
    }),
  });
  return { ok: res.ok, status: res.status };
}

async function sendTelegram(data: ReservationPayload) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { skipped: true };

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatText(data),
    }),
  });
  return { ok: res.ok, status: res.status };
}

function formatText(d: ReservationPayload) {
  const lines = [
    `Nouvelle demande de transfert — ${d.ref}`,
    ``,
    `Trajet : ${d.tripSummary}`,
    `Véhicule : ${d.vehicle}`,
    `Date : ${d.date}`,
    `Passagers : ${d.passengers}${d.luggage ? ` · Bagages : ${d.luggage}` : ""}`,
    d.withPilgrimage ? `Avec arrêt pèlerinage` : null,
    d.price ? `Prix indicatif : ${d.price.toLocaleString()} €` : null,
    d.specialRequests ? `Demandes spéciales : ${d.specialRequests}` : null,
    ``,
    `Client : ${d.name}`,
    `Email : ${d.email}`,
    `WhatsApp : ${d.whatsapp}`,
  ];
  return lines.filter(Boolean).join("\n");
}

export async function POST(request: Request) {
  const data = (await request.json()) as ReservationPayload;

  const [emailResult, telegramResult] = await Promise.allSettled([
    sendEmail(data),
    sendTelegram(data),
  ]);

  return NextResponse.json({
    ok: true,
    email: emailResult.status === "fulfilled" ? emailResult.value : { error: true },
    telegram: telegramResult.status === "fulfilled" ? telegramResult.value : { error: true },
  });
}
