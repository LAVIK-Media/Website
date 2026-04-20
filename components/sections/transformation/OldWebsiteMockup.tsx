"use client";

import Image from "next/image";

/**
 * Ugly ~2008 bakery website mockup — v4.1
 * 21 tiles. Hero text is a sibling (not child) of hero image to avoid
 * compound transforms during scatter. Sidebar uses % width for responsiveness.
 */
export default function OldWebsiteMockup() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100%",
        fontFamily: "'Times New Roman', Georgia, serif",
        color: "#333",
        background: "#f5f0e8",
        fontSize: 13,
        lineHeight: 1.5,
        position: "relative",
      }}
    >
      {/* ── NAVBAR ── */}
      <div
        data-tile="old-navbar"
        style={{
          background: "linear-gradient(to bottom, #1a1a5e, #0d0d3b)",
          padding: "6px 16px",
          borderBottom: "2px solid #ff8c00",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 38,
          willChange: "transform, opacity",
        }}
      >
        <div
          style={{
            fontFamily: "'Comic Sans MS', cursive",
            fontSize: 16,
            color: "#ff8c00",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            whiteSpace: "nowrap",
          }}
        >
          ★ Konditorei Inntal ★
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {["Startseite", "Über uns", "Produkte", "Kontakt"].map((item) => (
            <span
              key={item}
              style={{
                color: "#fff",
                fontSize: 9,
                padding: "3px 6px",
                textDecoration: "underline",
                cursor: "pointer",
                fontFamily: "Verdana, sans-serif",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── MARQUEE ── */}
      <div
        data-tile="old-marquee"
        style={{
          background: "#ff8c00",
          color: "#fff",
          fontSize: 10,
          padding: "3px 16px",
          fontFamily: "Verdana, sans-serif",
          textAlign: "center",
          fontWeight: "bold",
          height: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          willChange: "transform, opacity",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        ✨ Willkommen! — Frisches Brot seit 1987 — Jetzt NEU: Online bestellen! ✨
      </div>

      {/* ── HERO (image + text as siblings, not nested) ── */}
      <div style={{ position: "relative", height: 100 }}>
        <div
          data-tile="old-hero-image"
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            borderBottom: "2px solid #ff8c00",
            willChange: "transform, opacity",
          }}
        >
          <Image
            src="/transformation/hero-old.jpg"
            alt="Alte Bäckerei"
            fill
            sizes="1100px"
            style={{ objectFit: "cover", filter: "saturate(1.3) contrast(1.1)" }}
          />
        </div>
        <div
          data-tile="old-hero-text"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "2px solid #ff8c00",
            willChange: "transform, opacity",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontFamily: "'Comic Sans MS', cursive",
              fontSize: 20,
              color: "#ff8c00",
              textShadow: "3px 3px 6px #000",
              fontWeight: "bold",
            }}
          >
            Tradition trifft Geschmack!
          </div>
          <div
            style={{
              color: "#fff",
              fontSize: 11,
              marginTop: 4,
              fontFamily: "Verdana, sans-serif",
              textShadow: "1px 1px 3px #000",
            }}
          >
            Die beste Bäckerei im Inntal!
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT (sidebar + content) ── */}
      <div
        data-layout
        style={{
          display: "flex",
          margin: "0 auto",
          gap: 0,
        }}
      >
        {/* ── SIDEBAR — responsive % width ── */}
        <div
          data-layout
          style={{
            width: "24%",
            minWidth: 110,
            maxWidth: 180,
            background: "linear-gradient(to bottom, #4a3728, #3a2a1c)",
            borderRight: "2px solid #ff8c00",
            color: "#f5e6c8",
            fontSize: 10,
            fontFamily: "Verdana, sans-serif",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
          }}
        >
          <div
            data-tile="old-sidebar-header"
            style={{
              fontSize: 11,
              fontWeight: "bold",
              color: "#ff8c00",
              textTransform: "uppercase",
              borderBottom: "1px dashed #ff8c00",
              padding: "8px 8px 6px",
              willChange: "transform, opacity",
            }}
          >
            Navigation
          </div>

          <div
            data-tile="old-sidebar-links-1"
            style={{ padding: "4px 8px", willChange: "transform, opacity" }}
          >
            {["» Startseite", "» Unsere Brote", "» Gebäck", "» Torten"].map(
              (item) => (
                <div
                  key={item}
                  style={{
                    padding: "2px 0",
                    borderBottom: "1px dotted rgba(255,140,0,0.3)",
                    cursor: "pointer",
                    fontSize: 9,
                  }}
                >
                  {item}
                </div>
              )
            )}
          </div>

          <div
            data-tile="old-sidebar-links-2"
            style={{ padding: "4px 8px", willChange: "transform, opacity" }}
          >
            {["» Über uns", "» Anfahrt", "» Kontakt", "» Gästebuch"].map(
              (item) => (
                <div
                  key={item}
                  style={{
                    padding: "2px 0",
                    borderBottom: "1px dotted rgba(255,140,0,0.3)",
                    cursor: "pointer",
                    fontSize: 9,
                  }}
                >
                  {item}
                </div>
              )
            )}
          </div>

          <div
            data-tile="old-sidebar-counter"
            style={{
              margin: "6px 8px",
              padding: 5,
              background: "rgba(0,0,0,0.2)",
              borderRadius: 4,
              textAlign: "center",
              border: "1px dashed #ff8c00",
              willChange: "transform, opacity",
            }}
          >
            <div style={{ fontSize: 8, color: "#ff8c00", fontWeight: "bold", marginBottom: 2 }}>
              Besucherzähler
            </div>
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 12,
                color: "#0f0",
                background: "#111",
                padding: "2px 4px",
                borderRadius: 3,
                display: "inline-block",
                letterSpacing: 2,
              }}
            >
              004.738
            </div>
          </div>

          <div
            data-tile="old-sidebar-date"
            style={{
              padding: "4px 8px",
              fontSize: 8,
              color: "#c0a87c",
              textAlign: "center",
              willChange: "transform, opacity",
            }}
          >
            Letzte Aktualisierung:
            <br />
            14.03.2009
          </div>
        </div>

        {/* ── CONTENT AREA ── */}
        <div data-layout style={{ flex: 1, background: "#fff", minWidth: 0 }}>
          <div
            data-tile="old-content-heading"
            style={{ padding: "8px 14px 4px", willChange: "transform, opacity" }}
          >
            <h2
              style={{
                fontFamily: "'Comic Sans MS', cursive",
                color: "#1a1a5e",
                fontSize: 15,
                marginBottom: 0,
                borderBottom: "2px solid #ff8c00",
                paddingBottom: 3,
              }}
            >
              Herzlich Willkommen!
            </h2>
          </div>

          <div
            data-tile="old-content-text"
            style={{ padding: "4px 14px", willChange: "transform, opacity" }}
          >
            <p style={{ fontSize: 10, lineHeight: 1.6, color: "#555", margin: 0 }}>
              Wir, die Familie Gruber, heißen Sie herzlich willkommen! Unsere
              Bäckerei in Kufstein bietet Ihnen täglich frisches Brot und
              feinste Mehlspeisen aus der Region.
            </p>
          </div>

          <div
            data-tile="old-content-images"
            style={{
              padding: "6px 14px",
              display: "flex",
              gap: 6,
              willChange: "transform, opacity",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: 80,
                height: 45,
                borderRadius: 3,
                overflow: "hidden",
                border: "2px solid #ddd",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <Image
                src="/transformation/product-old-1.jpg"
                alt="Produkt"
                fill
                sizes="80px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                width: 80,
                height: 45,
                borderRadius: 3,
                overflow: "hidden",
                border: "2px solid #ddd",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <Image
                src="/transformation/product-old-2.jpg"
                alt="Produkt"
                fill
                sizes="80px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <p
              style={{
                fontSize: 8,
                color: "#888",
                fontStyle: "italic",
                alignSelf: "center",
                margin: 0,
              }}
            >
              Frisch aus dem Steinofen!
            </p>
          </div>

          <div
            data-tile="old-hours-heading"
            style={{
              padding: "4px 14px 2px",
              borderTop: "1px solid #eee",
              willChange: "transform, opacity",
            }}
          >
            <h3
              style={{
                fontFamily: "'Comic Sans MS', cursive",
                color: "#1a1a5e",
                fontSize: 12,
                margin: 0,
              }}
            >
              🕐 Öffnungszeiten
            </h3>
          </div>

          <div
            data-tile="old-hours-table"
            style={{ padding: "2px 14px", willChange: "transform, opacity" }}
          >
            <table
              style={{
                fontSize: 9,
                borderCollapse: "collapse",
                width: "100%",
                fontFamily: "Verdana, sans-serif",
              }}
            >
              <tbody>
                {[
                  ["Mo – Fr", "05:30 – 18:00"],
                  ["Samstag", "06:00 – 12:00"],
                  ["Sonntag", "07:00 – 11:00"],
                ].map(([day, time]) => (
                  <tr key={day}>
                    <td
                      style={{
                        padding: "2px 8px 2px 0",
                        fontWeight: "bold",
                        color: "#4a3728",
                        borderBottom: "1px dotted #ddd",
                      }}
                    >
                      {day}
                    </td>
                    <td
                      style={{
                        padding: "2px 0",
                        color: "#666",
                        borderBottom: "1px dotted #ddd",
                      }}
                    >
                      {time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            data-tile="old-hours-note"
            style={{ padding: "2px 14px 4px", willChange: "transform, opacity" }}
          >
            <p style={{ fontSize: 8, color: "#999", margin: 0, fontStyle: "italic" }}>
              * An Feiertagen gesonderte Zeiten.
            </p>
          </div>

          <div
            data-tile="old-news-heading"
            style={{
              padding: "4px 14px 2px",
              borderTop: "1px solid #eee",
              willChange: "transform, opacity",
            }}
          >
            <h3
              style={{
                fontFamily: "'Comic Sans MS', cursive",
                color: "#1a1a5e",
                fontSize: 12,
                margin: 0,
              }}
            >
              📢 Aktuelles
            </h3>
          </div>

          <div
            data-tile="old-news-card"
            style={{
              margin: "4px 14px",
              background: "#fff8e8",
              border: "1px solid #ffd700",
              borderRadius: 4,
              padding: "5px 8px",
              willChange: "transform, opacity",
            }}
          >
            <div style={{ fontSize: 10, fontWeight: "bold", color: "#b8860b" }}>
              NEU: Dinkel-Vollkornbrot!
            </div>
            <div style={{ fontSize: 9, color: "#666", marginTop: 2 }}>
              Ab sofort — nur solange der Vorrat reicht!
            </div>
          </div>

          <div
            data-tile="old-news-credit"
            style={{
              padding: "2px 14px 6px",
              fontSize: 8,
              color: "#aaa",
              textAlign: "right",
              willChange: "transform, opacity",
            }}
          >
            Erstellt von:{" "}
            <span style={{ fontStyle: "italic" }}>Mein Neffe (Danke Stefan!)</span>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div
        data-layout
        style={{
          background: "linear-gradient(to bottom, #1a1a5e, #0d0d3b)",
          borderTop: "2px solid #ff8c00",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "5px 16px",
          fontFamily: "Verdana, sans-serif",
        }}
      >
        <div
          data-tile="old-footer-copy"
          style={{
            fontSize: 8,
            color: "#aaa",
            textAlign: "center",
            willChange: "transform, opacity",
          }}
        >
          © 2009 Konditorei Inntal — Alle Rechte vorbehalten | Tel: 0211 87973998680
        </div>

        <div
          data-tile="old-footer-credit"
          style={{
            fontSize: 7,
            color: "#666",
            textAlign: "center",
            marginTop: 2,
            willChange: "transform, opacity",
          }}
        >
          Optimiert für Internet Explorer 6.0 | 1024x768 |{" "}
          <span style={{ color: "#ff8c00" }}>Webdesign: Stefan G.</span>
        </div>

        <div
          data-tile="old-footer-links"
          style={{
            marginTop: 3,
            textAlign: "center",
            willChange: "transform, opacity",
          }}
        >
          {["📧 E-Mail", "📠 Fax", "🖨️ Drucken", "⭐ Lesezeichen"].map(
            (item) => (
              <span
                key={item}
                style={{
                  margin: "0 4px",
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "#ccc",
                  fontSize: 8,
                }}
              >
                {item}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
