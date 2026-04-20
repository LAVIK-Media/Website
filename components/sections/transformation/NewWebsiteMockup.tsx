"use client";

import { ArrowRight, Clock, Award, MapPin, Phone, Wheat, Mail } from "lucide-react";

/**
 * Premium bakery website mockup — v8 "full dark".
 * Entirely dark-themed to avoid jarring white sections during animation.
 * Compact enough to show footer without scrolling in browser frame.
 */
export default function NewWebsiteMockup() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100%",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: "#e8d5b7",
        background: "#060D0A",
        fontSize: 13,
        lineHeight: 1.6,
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── NAVBAR ── */}
      <div
        data-layout
        style={{
          background: "rgba(6,13,10,0.97)",
          backdropFilter: "blur(16px)",
          padding: "0 24px",
          height: 42,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(184,134,11,0.1)",
          flexShrink: 0,
        }}
      >
        <div
          data-tile="new-nav-logo"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            willChange: "transform, opacity",
          }}
        >
          <div style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #d4a44a 0%, #8B6914 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Wheat size={12} color="#fff" />
          </div>
          <span style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#e8d5b7",
            letterSpacing: "0.03em",
          }}>
            Konditorei Inntal
          </span>
        </div>

        <div
          data-tile="new-nav-links"
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            willChange: "transform, opacity",
          }}
        >
          {["Produkte", "Über uns", "Tradition", "Kontakt"].map((item) => (
            <span
              key={item}
              style={{
                color: "rgba(232,213,183,0.5)",
                fontSize: 10.5,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {item}
            </span>
          ))}
          <span
            style={{
              background: "linear-gradient(135deg, #d4a44a 0%, #b8860b 100%)",
              color: "#fff",
              fontSize: 10,
              fontWeight: 600,
              padding: "5px 14px",
              borderRadius: 8,
              cursor: "pointer",
              boxShadow: "0 2px 12px rgba(184,134,11,0.3)",
            }}
          >
            Jetzt bestellen
          </span>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <div style={{ position: "relative", height: 175, overflow: "hidden", flexShrink: 0 }}>
        <div
          data-tile="new-hero-bg"
          style={{
            position: "absolute",
            inset: 0,
            willChange: "transform, opacity",
          }}
        >
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #2a1810 0%, #4a2e1c 30%, #3d2516 60%, #1a1410 100%)",
          }} />
          <div style={{
            position: "absolute",
            top: -30,
            right: "20%",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,164,74,0.25) 0%, transparent 70%)",
          }} />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(6,13,10,0.9) 0%, rgba(6,13,10,0.5) 45%, transparent 75%)",
          }} />
          {/* Bread silhouette shapes */}
          <div style={{
            position: "absolute",
            right: "8%",
            top: "15%",
            width: 140,
            height: 100,
            borderRadius: "60% 40% 50% 50% / 55% 45% 55% 45%",
            background: "linear-gradient(135deg, rgba(139,105,20,0.35) 0%, rgba(90,60,15,0.2) 100%)",
            transform: "rotate(-8deg)",
            filter: "blur(1px)",
          }} />
          <div style={{
            position: "absolute",
            right: "22%",
            top: "35%",
            width: 80,
            height: 60,
            borderRadius: "50% 50% 45% 55% / 55% 50% 50% 45%",
            background: "linear-gradient(135deg, rgba(139,105,20,0.25) 0%, rgba(90,60,15,0.15) 100%)",
            transform: "rotate(12deg)",
            filter: "blur(1px)",
          }} />
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 32px",
            zIndex: 1,
          }}
        >
          <div
            data-tile="new-hero-badge"
            style={{
              fontSize: 8,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#d4a44a",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 6,
              willChange: "transform, opacity",
            }}
          >
            <div style={{
              width: 20,
              height: 1,
              background: "linear-gradient(to right, #d4a44a, transparent)",
            }} />
            Seit 1987 — Handwerkskunst aus Tirol
          </div>

          <div
            data-tile="new-hero-title"
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.1,
              maxWidth: 320,
              marginBottom: 8,
              willChange: "transform, opacity",
              letterSpacing: "-0.01em",
            }}
          >
            Brot mit{" "}
            <span style={{
              background: "linear-gradient(135deg, #e8d5b7 0%, #d4a44a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Charakter.
            </span>
          </div>

          <div
            data-tile="new-hero-desc"
            style={{
              fontSize: 11.5,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 280,
              marginBottom: 14,
              lineHeight: 1.5,
              willChange: "transform, opacity",
            }}
          >
            Handgeknetet, steinofengebacken, mit besten
            Zutaten aus der Region.
          </div>

          <div
            data-tile="new-hero-buttons"
            style={{
              display: "flex",
              gap: 8,
              willChange: "transform, opacity",
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #d4a44a 0%, #b8860b 100%)",
                color: "#fff",
                fontSize: 10.5,
                fontWeight: 600,
                padding: "7px 16px",
                borderRadius: 10,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                boxShadow: "0 4px 20px rgba(184,134,11,0.35)",
              }}
            >
              Sortiment entdecken
              <ArrowRight size={11} />
            </span>
            <span
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(232,213,183,0.15)",
                color: "rgba(255,255,255,0.8)",
                fontSize: 10.5,
                fontWeight: 500,
                padding: "7px 16px",
                borderRadius: 10,
                cursor: "pointer",
              }}
            >
              Unsere Geschichte
            </span>
          </div>
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      <div
        data-tile="new-stats-strip"
        data-layout
        style={{
          background: "linear-gradient(135deg, #0c1a14 0%, #0f2118 100%)",
          padding: "10px 24px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          borderTop: "1px solid rgba(184,134,11,0.08)",
          borderBottom: "1px solid rgba(184,134,11,0.08)",
          willChange: "transform, opacity",
          flexShrink: 0,
        }}
      >
        {[
          { value: "35+", label: "Jahre Tradition" },
          { value: "100%", label: "Regionale Zutaten" },
          { value: "4:30", label: "Uhr Backstart" },
          { value: "★ 4.9", label: "Google Bewertung" },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{
              fontSize: 13,
              fontWeight: 800,
              color: "#d4a44a",
              lineHeight: 1.1,
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: 7.5,
              color: "rgba(232,213,183,0.4)",
              fontWeight: 500,
              letterSpacing: "0.04em",
              marginTop: 1,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── FEATURES ── */}
      <div
        data-layout
        style={{
          padding: "14px 20px 10px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 10,
          background: "#080f0c",
          flexShrink: 0,
        }}
      >
        {[
          {
            tile: "new-feature-1",
            icon: <Clock size={13} color="#d4a44a" />,
            title: "Frisch ab 5:30",
            desc: "Jeden Morgen frisch aus dem Steinofen.",
          },
          {
            tile: "new-feature-2",
            icon: <Award size={13} color="#d4a44a" />,
            title: "Meisterqualität",
            desc: "Tiroler Qualitätssiegel ausgezeichnet.",
          },
          {
            tile: "new-feature-3",
            icon: <MapPin size={13} color="#d4a44a" />,
            title: "Regionale Zutaten",
            desc: "100% Mehl aus Tiroler Mühlen.",
          },
        ].map((item) => (
          <div
            key={item.tile}
            data-tile={item.tile}
            style={{
              background: "rgba(232,213,183,0.04)",
              borderRadius: 12,
              padding: "12px 11px",
              border: "1px solid rgba(184,134,11,0.08)",
              willChange: "transform, opacity",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{
              position: "absolute",
              top: 0,
              left: "20%",
              right: "20%",
              height: 1,
              background: "linear-gradient(to right, transparent, rgba(212,164,74,0.3), transparent)",
            }} />
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 7,
                background: "rgba(184,134,11,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 7,
                border: "1px solid rgba(184,134,11,0.12)",
              }}
            >
              {item.icon}
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#e8d5b7",
                marginBottom: 2,
              }}
            >
              {item.title}
            </div>
            <div style={{ fontSize: 9, color: "rgba(232,213,183,0.45)", lineHeight: 1.45 }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>

      {/* ── PRODUCTS SECTION ── */}
      <div
        data-layout
        style={{
          padding: "8px 20px 12px",
          background: "#080f0c",
          flexShrink: 0,
        }}
      >
        <div
          data-tile="new-products-heading"
          style={{
            textAlign: "center",
            marginBottom: 10,
            willChange: "transform, opacity",
          }}
        >
          <div
            style={{
              fontSize: 8,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#d4a44a",
              marginBottom: 2,
            }}
          >
            Unsere Spezialitäten
          </div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#e8d5b7",
              lineHeight: 1.2,
            }}
          >
            Frisch aus dem Steinofen
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }}
        >
          {[
            {
              tile: "new-product-1",
              name: "Tiroler Bauernbrot",
              desc: "Sauerteig · 24h geführt · 1kg",
              price: "€ 4,90",
              gradient: "linear-gradient(135deg, #5c3d1a 0%, #8B6520 30%, #6b4420 60%, #4a2e14 100%)",
              badge: "Bestseller",
            },
            {
              tile: "new-product-2",
              name: "Butterkipferl",
              desc: "Handgeformt · Tiroler Butter",
              price: "€ 1,80",
              gradient: "linear-gradient(135deg, #c4993d 0%, #dbb65c 30%, #c9a040 60%, #a07828 100%)",
              badge: "Klassiker",
            },
          ].map((item) => (
            <div
              key={item.tile}
              data-tile={item.tile}
              style={{
                background: "rgba(232,213,183,0.04)",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid rgba(184,134,11,0.08)",
                willChange: "transform, opacity",
              }}
            >
              <div style={{
                width: "100%",
                height: 48,
                background: item.gradient,
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute",
                  top: "-50%",
                  right: "-20%",
                  width: "60%",
                  height: "200%",
                  background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
                  transform: "rotate(25deg)",
                }} />
                <div style={{
                  position: "absolute",
                  top: 5,
                  left: 5,
                  background: "rgba(6,13,10,0.7)",
                  backdropFilter: "blur(8px)",
                  color: "#d4a44a",
                  fontSize: 7,
                  fontWeight: 700,
                  padding: "2px 6px",
                  borderRadius: 5,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  border: "1px solid rgba(184,134,11,0.2)",
                }}>
                  {item.badge}
                </div>
              </div>
              <div style={{ padding: "7px 10px 9px" }}>
                <div style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#e8d5b7",
                  marginBottom: 1,
                }}>
                  {item.name}
                </div>
                <div style={{
                  fontSize: 8,
                  color: "rgba(232,213,183,0.4)",
                  marginBottom: 5,
                }}>
                  {item.desc}
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                  <div style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: "#d4a44a",
                  }}>
                    {item.price}
                  </div>
                  <div style={{
                    width: 22,
                    height: 22,
                    borderRadius: 7,
                    background: "linear-gradient(135deg, #d4a44a 0%, #b8860b 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(184,134,11,0.25)",
                  }}>
                    <ArrowRight size={10} color="#fff" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div
        data-layout
        style={{
          background: "#050a08",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(184,134,11,0.08)",
          marginTop: "auto",
          flexShrink: 0,
        }}
      >
        <div
          data-tile="new-footer-brand"
          style={{ willChange: "transform, opacity" }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 2,
          }}>
            <div style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #d4a44a 0%, #8B6914 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <Wheat size={7} color="#fff" />
            </div>
            <span style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#e8d5b7",
            }}>
              Konditorei Inntal
            </span>
          </div>
          <div style={{ fontSize: 7.5, color: "rgba(232,213,183,0.3)", paddingLeft: 20 }}>
            © 2025 — Handwerk mit Leidenschaft
          </div>
        </div>

        <div
          data-tile="new-footer-contact"
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            color: "rgba(232,213,183,0.4)",
            fontSize: 8.5,
            willChange: "transform, opacity",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
            <Phone size={8} /> +49 211 87973998680
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
            <Mail size={8} /> info@inntal.at
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
            <MapPin size={8} /> Kufstein, Tirol
          </span>
        </div>
      </div>
    </div>
  );
}
