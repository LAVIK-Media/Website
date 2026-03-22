import { NextResponse } from "next/server";

const MAX = {
  name: 120,
  company: 160,
  email: 254,
  phone: 40,
  industry: 80,
  service: 80,
  message: 8000,
} as const;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function trimStr(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.info(
        "[api/contact] RESEND_API_KEY fehlt — 200 ohne Versand (nur NODE_ENV=development)."
      );
      return NextResponse.json({
        ok: true,
        devMock: true,
        message:
          "Lokal: Es wurde keine E-Mail versendet. Trage RESEND_API_KEY in .env.local ein, um Resend zu testen.",
      });
    }
    return NextResponse.json(
      {
        message:
          "E-Mail-Versand ist nicht konfiguriert. Bitte RESEND_API_KEY in der Umgebung setzen.",
      },
      { status: 503 }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ message: "Ungültige Anfrage." }, { status: 400 });
  }

  if (typeof json !== "object" || json === null) {
    return NextResponse.json({ message: "Ungültige Daten." }, { status: 400 });
  }

  const o = json as Record<string, unknown>;

  const name = trimStr(o.name, MAX.name);
  const company = trimStr(o.company, MAX.company);
  const email = trimStr(o.email, MAX.email);
  const phone = trimStr(o.phone, MAX.phone);
  const industry = trimStr(o.industry, MAX.industry);
  const service = trimStr(o.service, MAX.service);
  const message = trimStr(o.message, MAX.message);

  if (name.length < 2) {
    return NextResponse.json(
      { message: "Bitte geben Sie Ihren Namen an." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { message: "Bitte geben Sie eine gültige E-Mail-Adresse an." },
      { status: 400 }
    );
  }
  if (message.length < 10) {
    return NextResponse.json(
      { message: "Bitte beschreiben Sie Ihr Anliegen etwas ausführlicher." },
      { status: 400 }
    );
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "kontakt@lavik-media.com";
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "LAVIK Media <onboarding@resend.dev>";

  const lines = [
    `Name: ${name}`,
    company ? `Unternehmen: ${company}` : null,
    `E-Mail: ${email}`,
    phone ? `Telefon: ${phone}` : null,
    industry ? `Branche: ${industry}` : null,
    service ? `Anliegen: ${service}` : null,
    "",
    "Nachricht:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    ${company ? `<p><strong>Unternehmen:</strong> ${escapeHtml(company)}</p>` : ""}
    <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>` : ""}
    ${industry ? `<p><strong>Branche:</strong> ${escapeHtml(industry)}</p>` : ""}
    ${service ? `<p><strong>Anliegen:</strong> ${escapeHtml(service)}</p>` : ""}
    <p><strong>Nachricht:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `.trim();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Kontaktanfrage Website — ${name}`,
      text: lines,
      html,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    console.error("Resend error:", res.status, errBody);
    return NextResponse.json(
      {
        message:
          "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder schreiben Sie uns direkt per E-Mail.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
