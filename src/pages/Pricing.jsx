import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ─── DATA ─────────────────────────────────────────── */
const PLANS = [
  {
    id: "starter",
    tier: "Starter",
    name: ["Solo", "Grower"],
    desc: "For individuals building their personal brand from the ground up.",
    monthly: 19,
    annual: 13,
    chipClass: "chip-s",
    btnClass: "btn-ghost",
    btnLabel: "Get Started",
    features: [
      { label: "1 LinkedIn profile connected", dim: false },
      { label: "15 AI posts generated/month", dim: false },
      { label: "Basic analytics dashboard", dim: false },
      { label: "Post scheduler (30 slots)", dim: false },
      { label: "Competitor tracking", dim: true },
      { label: "Team workspace", dim: true },
    ],
  },
  {
    id: "pro",
    tier: "Pro",
    name: ["Power", "Creator"],
    desc: "For professionals who want consistent, compounding LinkedIn growth.",
    monthly: 49,
    annual: 34,
    chipClass: "chip-p",
    btnClass: "btn-lime",
    btnLabel: "Start Free Trial",
    popular: true,
    features: [
      { label: "3 LinkedIn profiles", dim: false, ck: "ck-lime", stroke: "#111" },
      { label: "Unlimited AI posts", dim: false, ck: "ck-lime", stroke: "#111" },
      { label: "Advanced analytics & insights", dim: false, ck: "ck-lime", stroke: "#111" },
      { label: "Competitor tracking (5 rivals)", dim: false, ck: "ck-lime", stroke: "#111" },
      { label: "AI reply assistant", dim: false, ck: "ck-lime", stroke: "#111" },
      { label: "Team workspace", dim: true, ck: "ck-lime-o", stroke: "#c8f000" },
    ],
  },
  {
    id: "agency",
    tier: "Agency",
    name: ["Scale", "Engine"],
    desc: "Built for agencies managing multiple client accounts at full scale.",
    monthly: 149,
    annual: 104,
    chipClass: "chip-a",
    btnClass: "btn-ghost",
    btnLabel: "Get Started",
    features: [
      { label: "Unlimited LinkedIn profiles", dim: false },
      { label: "Unlimited AI content", dim: false },
      { label: "White-label client reports", dim: false },
      { label: "Unlimited competitor tracking", dim: false },
      { label: "Team workspace (20 seats)", dim: false },
      { label: "Priority support & onboarding", dim: false },
    ],
  },
];

const TRUST_STATS = [
  { num: "12,400+", lbl: "Active Users" },
  { num: "3.2M", lbl: "Posts Generated" },
  { num: "4.9★", lbl: "Average Rating" },
  { num: "14-Day", lbl: "Free Trial" },
  { num: "No Card", lbl: "Required to Start" },
];

const FAQS = [
  {
    q: "Can I switch plans anytime?",
    a: "Yes — upgrade or downgrade at any time. Changes take effect at your next billing cycle with automatic proration.",
  },
  {
    q: 'What counts as a "LinkedIn profile"?',
    a: "Each connected LinkedIn account is one profile. You connect via OAuth — Linkziy never stores your credentials.",
  },
  {
    q: "Is the AI content detectable?",
    a: "Our AI is trained on your personal tone samples. The output is highly natural and passes major AI-detection tools.",
  },
  {
    q: "Do you offer refunds?",
    a: "Full refund within 7 days of your first paid charge if you're not satisfied — no questions asked.",
  },
  {
    q: "What payment methods are accepted?",
    a: "All major credit cards (Visa, Mastercard, Amex). Annual Agency plans also support invoice-based payment.",
  },
  {
    q: "Discounts for students or non-profits?",
    a: "Yes — 50% off for verified students and registered non-profits. Contact our support team to apply.",
  },
];

/* ─── COMPONENTS ───────────────────────────────────── */

function CheckIcon({ stroke = "#555" }) {
  return (
    <svg viewBox="0 0 9 7" fill="none" style={{ width: 9, height: 9 }}>
      <path
        d="M1 3.5l2 2L8 1"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BillingToggle({ annual, onToggle }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: ".9rem",
        marginBottom: "2.8rem",
        flexWrap: "wrap",
      }}
    >
      <span
        style={{
          fontSize: ".82rem",
          fontWeight: 700,
          letterSpacing: ".05em",
          textTransform: "uppercase",
          color: !annual ? "#111" : "#888",
        }}
      >
        Monthly
      </span>

      <label
        style={{
          position: "relative",
          width: 48,
          height: 26,
          cursor: "pointer",
          display: "inline-block",
        }}
      >
        <input
          type="checkbox"
          checked={annual}
          onChange={onToggle}
          style={{ opacity: 0, width: 0, height: 0 }}
        />
        <span
          style={{
            position: "absolute",
            inset: 0,
            background: annual ? "#c8f000" : "#d0ccc4",
            borderRadius: 100,
            transition: "background .3s",
          }}
        >
          <span
            style={{
              position: "absolute",
              width: 20,
              height: 20,
              left: 3,
              top: 3,
              background: "#111",
              borderRadius: "50%",
              transform: annual ? "translateX(22px)" : "none",
              transition: "transform .3s",
            }}
          />
        </span>
      </label>

      <span
        style={{
          fontSize: ".82rem",
          fontWeight: 700,
          letterSpacing: ".05em",
          textTransform: "uppercase",
          color: annual ? "#111" : "#888",
        }}
      >
        Annual
      </span>

      <span
        style={{
          fontSize: ".68rem",
          fontWeight: 800,
          letterSpacing: ".07em",
          textTransform: "uppercase",
          background: "#111",
          color: "#c8f000",
          padding: ".22rem .65rem",
          borderRadius: 4,
        }}
      >
        Save 30%
      </span>
    </div>
  );
}

function PlanCard({ plan, annual }) {
  const price = annual ? plan.annual : plan.monthly;
  const isPopular = plan.popular;
  const isAgency = plan.id === "agency";

  const getChkStyle = (feat) => {
    if (isPopular) {
      const ck = feat.ck || "ck-lime";
      if (ck === "ck-lime") return { background: "#c8f000", border: "none" };
      if (ck === "ck-lime-o") {
        return { background: "transparent", border: "1.5px solid #c8f000" };
      }
    }
    if (isAgency) return { background: "#111", border: "1.5px solid #333" };
    return { background: "#f0ede6", border: "1.5px solid #d0ccc4" };
  };

  const getStroke = (feat) => {
    if (isPopular) return feat.stroke || "#111";
    if (isAgency) return "#c8f000";
    return "#555";
  };

  return (
    <div
      style={{
        borderRadius: 18,
        padding: "2rem",
        border: `2px solid ${isPopular ? "#c8f000" : "#d0ccc4"}`,
        background: isPopular ? "#181818" : "#fff",
        position: "relative",
        transform: isPopular ? "translateY(-12px)" : "none",
        transition: "transform .28s, box-shadow .28s",
        animation: "up .5s ease both",
        color: isPopular ? "#fff" : "#111",
        boxShadow: isPopular
          ? "0 18px 40px rgba(0,0,0,0.18)"
          : "0 8px 24px rgba(0,0,0,0.04)",
      }}
    >
      {isPopular && (
        <div
          style={{
            position: "absolute",
            top: -14,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#c8f000",
            color: "#111",
            fontSize: ".65rem",
            fontWeight: 800,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            padding: ".26rem .95rem",
            borderRadius: 100,
            whiteSpace: "nowrap",
          }}
        >
          ★ Most Popular
        </div>
      )}

      <span
        style={{
          display: "inline-block",
          fontSize: ".65rem",
          fontWeight: 800,
          letterSpacing: ".12em",
          textTransform: "uppercase",
          padding: ".22rem .7rem",
          borderRadius: 4,
          marginBottom: "1rem",
          ...(plan.chipClass === "chip-s"
            ? {
                background: "#f0ede6",
                color: "#555",
                border: "1.5px solid #d0ccc4",
              }
            : plan.chipClass === "chip-p"
            ? { background: "#c8f000", color: "#111" }
            : { background: "#222", color: "#c8f000" }),
        }}
      >
        {plan.tier}
      </span>

      <div
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "2.1rem",
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "-.01em",
          lineHeight: 1,
          color: isPopular ? "#fff" : "#111",
          marginBottom: ".5rem",
        }}
      >
        {plan.name[0]}
        <br />
        {plan.name[1]}
      </div>

      <p
        style={{
          fontSize: ".84rem",
          color: isPopular ? "#999" : "#555",
          lineHeight: 1.6,
          minHeight: "2.4rem",
          marginBottom: "1.4rem",
        }}
      >
        {plan.desc}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: ".2rem",
          paddingBottom: "1.4rem",
          marginBottom: "1.5rem",
          borderBottom: `1.5px solid ${isPopular ? "#2e2e2e" : "#d0ccc4"}`,
        }}
      >
        <span
          style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontSize: "1.3rem",
            fontWeight: 700,
            color: isPopular ? "#666" : "#888",
            marginBottom: ".45rem",
          }}
        >
          $
        </span>
        <span
          style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontSize: "4rem",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-.03em",
            color: isPopular ? "#c8f000" : "#111",
            transition: "all .3s",
          }}
        >
          {price}
        </span>
        <span
          style={{
            fontSize: ".82rem",
            color: "#888",
            fontWeight: 500,
            marginBottom: ".5rem",
          }}
        >
          /mo
        </span>
      </div>

      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: ".7rem",
          marginBottom: "1.8rem",
          padding: 0,
        }}
      >
        {plan.features.map((feat, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: ".65rem",
              fontSize: ".855rem",
              lineHeight: 1.4,
              color: isPopular ? "#ccc" : "#1a1a1a",
              opacity: feat.dim ? 0.35 : 1,
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: 18,
                height: 18,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 1,
                ...getChkStyle(feat),
              }}
            >
              <CheckIcon stroke={getStroke(feat)} />
            </span>
            {feat.label}
          </li>
        ))}
      </ul>

      <button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: ".5rem",
          width: "100%",
          padding: ".88rem 1.5rem",
          borderRadius: 10,
          fontSize: ".82rem",
          fontWeight: 800,
          letterSpacing: ".07em",
          textTransform: "uppercase",
          cursor: "pointer",
          ...(plan.btnClass === "btn-lime"
            ? {
                background: "#c8f000",
                color: "#111",
                border: "none",
                boxShadow: "0 6px 18px rgba(200,240,0,.28)",
              }
            : {
                background: "transparent",
                color: isPopular ? "#fff" : "#111",
                border: `2px solid ${isPopular ? "#444" : "#d0ccc4"}`,
              }),
        }}
      >
        {plan.btnLabel}
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: ".65rem",
            flexShrink: 0,
            background: "#111",
            color: plan.btnClass === "btn-lime" ? "#c8f000" : "#fff",
          }}
        >
          →
        </span>
      </button>
    </div>
  );
}

function TrustBar() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
      <div
        style={{
          borderTop: "2px dashed #d0ccc4",
          borderBottom: "2px dashed #d0ccc4",
          padding: "2rem 0",
          marginBottom: "4.5rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: "1.5rem",
        }}
      >
        {TRUST_STATS.map(({ num, lbl }) => (
          <div key={lbl} style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: "2.1rem",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-.02em",
                lineHeight: 1,
              }}
            >
              {num}
            </div>
            <div
              style={{
                fontSize: ".68rem",
                fontWeight: 700,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "#888",
                marginTop: ".2rem",
              }}
            >
              {lbl}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen((o) => !o)}
      style={{
        background: open ? "#f7fae5" : "#fff",
        border: `2px solid ${open ? "#c8f000" : "#d0ccc4"}`,
        borderRadius: 12,
        padding: "1.25rem 1.4rem",
        cursor: "pointer",
        transition: "border-color .2s, background .2s",
      }}
    >
      <div
        style={{
          fontSize: ".875rem",
          fontWeight: 700,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: ".8rem",
          color: "#111",
        }}
      >
        {q}
        <span
          style={{
            width: 23,
            height: 23,
            border: `2px solid ${open ? "#c8f000" : "#d0ccc4"}`,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: ".85rem",
            flexShrink: 0,
            color: open ? "#111" : "#888",
            background: open ? "#c8f000" : "transparent",
            transform: open ? "rotate(45deg)" : "none",
            transition:
              "transform .25s, background .2s, border-color .2s, color .2s",
          }}
        >
          +
        </span>
      </div>

      <div
        style={{
          fontSize: ".84rem",
          color: "#555",
          lineHeight: 1.65,
          maxHeight: open ? 200 : 0,
          overflow: "hidden",
          transition: "max-height .35s ease, margin-top .2s",
          marginTop: open ? ".75rem" : 0,
        }}
      >
        {a}
      </div>
    </div>
  );
}

function FaqSection() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem 5.5rem" }}>
      <span
        style={{
          display: "inline-block",
          fontSize: ".68rem",
          fontWeight: 800,
          letterSpacing: ".12em",
          textTransform: "uppercase",
          background: "#c8f000",
          color: "#111",
          padding: ".22rem .7rem",
          borderRadius: 4,
          marginBottom: ".9rem",
        }}
      >
        FAQ
      </span>

      <div
        style={{
          fontFamily: "'Barlow Condensed',sans-serif",
          fontSize: "clamp(2rem,4vw,3rem)",
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "-.02em",
          lineHeight: 1.05,
          marginBottom: ".5rem",
        }}
      >
        Got Questions?
        <br />
        We've Got Answers.
      </div>

      <p style={{ fontSize: ".9rem", color: "#555", marginBottom: "2.2rem" }}>
        Everything you need before you start growing on LinkedIn.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: ".8rem",
        }}
      >
        {FAQS.map(({ q, a }) => (
          <FaqItem key={q} q={q} a={a} />
        ))}
      </div>
    </div>
  );
}

/* ─── PAGE ─────────────────────────────────────────── */
export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@700;800;900&display=swap');

        * { box-sizing: border-box; }

        @keyframes up {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: none; }
        }

        @media (max-width: 980px) {
          .pricing-cards {
            grid-template-columns: 1fr !important;
          }

          .pricing-faq-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#f4f2e8",
          fontFamily: "'Barlow', sans-serif",
          color: "#111",
        }}
      >
        <Navbar />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3.5rem 2rem 0" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1rem",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: ".6rem",
                background: "#c8f000",
                color: "#111",
                fontSize: ".7rem",
                fontWeight: 800,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                padding: ".3rem .85rem",
                borderRadius: 4,
              }}
            >
              💰 Pricing
            </span>

            <span
              style={{
                fontSize: ".82rem",
                fontWeight: 600,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                color: "#888",
              }}
            >
              Simple & Transparent
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(3.8rem, 9vw, 7.5rem)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-.02em",
              lineHeight: 0.93,
              color: "#111",
              marginBottom: "1.2rem",
            }}
          >
            PICK YOUR
            <br />
            <span style={{ color: "#c8f000" }}>GROWTH</span>
            <br />
            <span style={{ WebkitTextStroke: "3px #111", color: "transparent" }}>
              PLAN.
            </span>
          </h1>

          <p
            style={{
              fontSize: ".98rem",
              color: "#555",
              lineHeight: 1.65,
              maxWidth: 440,
              marginBottom: "2.2rem",
            }}
          >
            No hidden fees. No contracts. Just results.
            <br />
            Start free for 14 days — no credit card required.
          </p>

          <BillingToggle annual={annual} onToggle={() => setAnnual((a) => !a)} />
        </div>

        <hr
          style={{
            border: "none",
            borderTop: "2px dashed #d0ccc4",
            maxWidth: 1100,
            margin: "0 auto 3rem",
          }}
        />

        <div
          className="pricing-cards"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 2rem 4rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "1.25rem",
            alignItems: "start",
          }}
        >
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} annual={annual} />
          ))}
        </div>

        <TrustBar />

        <div className="pricing-faq-grid">
          <FaqSection />
        </div>

        <Footer />
      </div>
    </>
  );
}