"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ShimmerButton from "@/components/ui/ShimmerButton";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const industries = [
  "Gastronomie & Hotellerie",
  "Handwerk & Bau",
  "Handel & E-Commerce",
  "Dienstleistung & Beratung",
  "Gesundheit & Wellness",
  "Transport & Logistik",
  "Sonstiges",
];

const services = [
  "Neue Website",
  "Website-Relaunch",
  "Landingpage",
  "Wartung & Hosting",
  "Ich bin noch unentschlossen",
];

function InputField({
  label,
  id,
  type = "text",
  required = false,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-semibold uppercase tracking-wider text-[#6F8580] mb-2"
      >
        {label}
        {required && <span className="text-[#1FBF8F] ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3.5 rounded-xl bg-[#0F1F1A]/50 border border-[#1C2B26] text-[#F2F5F4] placeholder-[#6F8580]/50 text-sm focus:outline-none focus:border-[#0F7A5A]/50 focus:bg-[#132822]/60 transition-all duration-200"
      />
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [key]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAcknowledged) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => ({}))) as {
        message?: string;
      };
      if (!res.ok) {
        setError(
          data.message ??
            "Senden fehlgeschlagen. Bitte versuchen Sie es später erneut."
        );
        return;
      }
      setSubmitted(true);
    } catch {
      setError(
        "Netzwerkfehler. Bitte prüfen Sie Ihre Verbindung oder schreiben Sie uns direkt per E-Mail."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="kontakt"
      className="section-padding bg-[#050706] relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#0F7A5A]/[0.04] rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <ScrollReveal blur={8} scaleFrom={0.99}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="section-label mx-auto mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1FBF8F]" />
              Kontakt
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-bold tracking-tight text-[#F2F5F4] mb-4 leading-tight">
              Lassen Sie uns sprechen
            </h2>
            <p className="text-[#9BAFA8] text-lg leading-relaxed">
              Erzählen Sie uns von Ihrem Projekt. Wir melden uns innerhalb von
              24 Stunden mit einer ersten Einschätzung.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 items-start">
          {/* Left — contact info */}
          <ScrollReveal direction="left" blur={8} scaleFrom={0.99}>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-display font-semibold text-[#F2F5F4] mb-4">
                  Direkt in Kontakt treten
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: Mail,
                      label: "E-Mail",
                      value: "service@lavik-media.com",
                      href: "mailto:service@lavik-media.com",
                    },
                    {
                      icon: Phone,
                      label: "Telefon",
                      value: "+43 (0) 5372 XXX XXX",
                      href: "tel:+435372000000",
                    },
                    {
                      icon: MapPin,
                      label: "Standort",
                      value: "Kufstein, Tirol",
                      href: null,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-4 p-4 rounded-xl border border-[#1C2B26] bg-[#0F1F1A]/30"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#0F7A5A]/[0.08] border border-[#0F7A5A]/15 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-[#1FBF8F]" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-[#6F8580] font-medium mb-0.5">
                          {item.label}
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm text-[#9BAFA8] hover:text-[#F2F5F4] transition-colors font-medium"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className="text-sm text-[#9BAFA8]">
                            {item.value}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promise */}
              <div className="p-5 rounded-xl border border-[#0F7A5A]/15 bg-[#0F7A5A]/[0.04]">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1FBF8F] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#F2F5F4]/80 mb-1">
                      Antwort innerhalb von 24 Stunden
                    </p>
                    <p className="text-xs text-[#6F8580] leading-relaxed">
                      Kein automatischer Rückruf, kein anonymes Ticketsystem.
                      Sie hören direkt von uns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — form */}
          <ScrollReveal direction="right" blur={8} scaleFrom={0.99}>
            <div className="rounded-2xl border border-[#1C2B26] bg-[#0F1F1A]/30 p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-[#0F7A5A]/20 border border-[#0F7A5A]/30 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8 text-[#1FBF8F]" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-[#F2F5F4] mb-2">
                    Nachricht gesendet!
                  </h3>
                  <p className="text-[#9BAFA8] text-sm leading-relaxed">
                    Danke für Ihre Anfrage. Wir melden uns innerhalb von 24
                    Stunden bei Ihnen.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField
                      id="name"
                      label="Ihr Name"
                      required
                      placeholder="Max Mustermann"
                      value={form.name}
                      onChange={set("name")}
                    />
                    <InputField
                      id="company"
                      label="Unternehmen"
                      placeholder="Muster GmbH"
                      value={form.company}
                      onChange={set("company")}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField
                      id="email"
                      label="E-Mail"
                      type="email"
                      required
                      placeholder="max@beispiel.at"
                      value={form.email}
                      onChange={set("email")}
                    />
                    <InputField
                      id="phone"
                      label="Telefon (optional)"
                      type="tel"
                      placeholder="+43 000 000 000"
                      value={form.phone}
                      onChange={set("phone")}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="industry"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#6F8580] mb-2"
                      >
                        Branche
                      </label>
                      <select
                        id="industry"
                        value={form.industry}
                        onChange={(e) => set("industry")(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#0F1F1A]/50 border border-[#1C2B26] text-sm text-[#9BAFA8] focus:outline-none focus:border-[#0F7A5A]/50 focus:bg-[#132822]/60 transition-all duration-200 appearance-none"
                      >
                        <option value="" className="bg-[#0F1F1A]">
                          Bitte wählen
                        </option>
                        {industries.map((ind) => (
                          <option
                            key={ind}
                            value={ind}
                            className="bg-[#0F1F1A]"
                          >
                            {ind}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="service"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#6F8580] mb-2"
                      >
                        Was wird benötigt?
                      </label>
                      <select
                        id="service"
                        value={form.service}
                        onChange={(e) => set("service")(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#0F1F1A]/50 border border-[#1C2B26] text-sm text-[#9BAFA8] focus:outline-none focus:border-[#0F7A5A]/50 focus:bg-[#132822]/60 transition-all duration-200 appearance-none"
                      >
                        <option value="" className="bg-[#0F1F1A]">
                          Bitte wählen
                        </option>
                        {services.map((svc) => (
                          <option
                            key={svc}
                            value={svc}
                            className="bg-[#0F1F1A]"
                          >
                            {svc}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#6F8580] mb-2"
                    >
                      Nachricht
                      <span className="text-[#1FBF8F] ml-1">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      placeholder="Beschreiben Sie kurz Ihr Projekt und Ihre Vorstellungen..."
                      value={form.message}
                      onChange={(e) => set("message")(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#0F1F1A]/50 border border-[#1C2B26] text-[#F2F5F4] placeholder-[#6F8580]/50 text-sm focus:outline-none focus:border-[#0F7A5A]/50 focus:bg-[#132822]/60 transition-all duration-200 resize-none"
                    />
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="text-sm text-red-300/95 text-center bg-red-950/25 border border-red-900/40 rounded-xl px-4 py-3 leading-relaxed"
                    >
                      {error}
                    </p>
                  )}

                  <div className="flex items-start gap-3 rounded-xl border border-[#1C2B26] bg-[#0F1F1A]/30 p-4">
                    <input
                      id="privacy-ack"
                      type="checkbox"
                      checked={privacyAcknowledged}
                      onChange={(e) =>
                        setPrivacyAcknowledged(e.target.checked)
                      }
                      className="mt-1 h-4 w-4 shrink-0 rounded border-[#1C2B26] bg-[#0F1F1A] text-[#0F7A5A] focus:ring-[#0F7A5A]/40"
                      required
                    />
                    <label
                      htmlFor="privacy-ack"
                      className="text-xs text-[#9BAFA8] leading-relaxed cursor-pointer"
                    >
                      Ich habe die{" "}
                      <a
                        href="/datenschutz"
                        className="text-[#1FBF8F] hover:text-[#2FD4A4] underline underline-offset-2"
                      >
                        Datenschutzerklärung
                      </a>{" "}
                      zur Kenntnis genommen und verstanden, wie meine Angaben
                      verarbeitet werden.{" "}
                      <span className="text-[#1FBF8F]">*</span>
                    </label>
                  </div>

                  <ShimmerButton
                    type="submit"
                    size="lg"
                    className={cn(
                      "w-full justify-center",
                      (loading || !privacyAcknowledged) && "opacity-70"
                    )}
                    disabled={loading || !privacyAcknowledged}
                  >
                    {loading ? (
                      "Wird gesendet..."
                    ) : (
                      <>
                        Anfrage absenden
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </ShimmerButton>

                  <p className="text-[11px] text-[#6F8580] text-center">
                    Pflichtfelder sind mit * gekennzeichnet. Die Übermittlung
                    erfolgt verschlüsselt (HTTPS).
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
