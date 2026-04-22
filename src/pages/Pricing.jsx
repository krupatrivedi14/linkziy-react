import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ─── DATA ──────────────────────────────────────────────── */
const PLANS = [
  {
    id: "starter",
    tier: "Starter",
    name: "Solo Grower",
    desc: "For individuals building their personal brand from the ground up.",
    monthly: 19,
    annual: 13,
    popular: false,
    features: [
      "1 LinkedIn profile connected",
      "15 AI posts generated/month",
      "Basic analytics dashboard",
      "Post scheduler (30 slots)",
    ],
    unavailable: ["Competitor tracking", "Team workspace"],
    btnLabel: "Get Started",
  },
  {
    id: "pro",
    tier: "Pro",
    name: "Power Creator",
    desc: "For professionals who want consistent, compounding LinkedIn growth.",
    monthly: 49,
    annual: 34,
    popular: true,
    features: [
      "3 LinkedIn profiles",
      "Unlimited AI posts",
      "Advanced analytics & insights",
      "Competitor tracking (5 rivals)",
      "AI reply assistant",
    ],
    unavailable: ["Team workspace"],
    btnLabel: "Start Free Trial",
  },
  {
    id: "agency",
    tier: "Agency",
    name: "Scale Engine",
    desc: "Built for agencies managing multiple client accounts at full scale.",
    monthly: 149,
    annual: 104,
    popular: false,
    features: [
      "Unlimited LinkedIn profiles",
      "Unlimited AI content",
      "White-label client reports",
      "Unlimited competitor tracking",
      "Team workspace (20 seats)",
      "Priority support & onboarding",
    ],
    unavailable: [],
    btnLabel: "Contact Sales",
  },
];

const REVIEWS = [
  {
    initials: "A",
    color: "#7c6fcd",
    name: "Arpit T.",
    date: "Dec 19, 2025",
    text: "Linkziy completely transformed how I show up on LinkedIn. My post engagement tripled in the first month — the AI really does nail my voice.",
  },
  {
    initials: "D",
    color: "#4a90d9",
    name: "Don E.",
    date: "Dec 10, 2025",
    text: "The competitor tracking alone is worth the price. I can see exactly what's working in my niche and reverse-engineer winning content.",
  },
  {
    initials: "J",
    color: "#c0392b",
    name: "Jelle H.",
    date: "Dec 8, 2025",
    text: "Setup took under 10 minutes and I had my first week of posts scheduled before lunch. Incredibly smooth onboarding experience.",
  },
  {
    initials: "A",
    color: "#888",
    name: "Alastair M.",
    date: "Dec 4, 2025",
    text: "The annual plan made it an easy decision. Priced fairly for what you get, and the analytics dashboard gives me data I actually use every week.",
  },
  {
    initials: "M",
    color: "#27ae60",
    name: "Michael S.",
    date: "Dec 1, 2025",
    text: "Switched from a competitor and haven't looked back. The AI reply assistant saves me at least 2 hours a week on comment engagement alone.",
  },
];

const PROMISES = [
  {
    title: "14-day free trial",
    body: "Try every feature of Linkziy completely free for 14 days. No credit card required. If you don't love it, you simply walk away — no charges, no questions.",
  },
  {
    title: "Cancel anytime",
    body: "There are no long-term contracts or lock-ins. Cancel your subscription at any time directly from your dashboard and you'll never be charged again.",
  },
  {
    title: "Safe & secure payments",
    body: "All transactions are protected by SSL encryption. We accept all major credit cards and never store your payment details on our servers.",
  },
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

const TRUST_BADGES = [
  { icon: "✦", label: "14-day free trial" },
  { icon: "⚡", label: "Instant account access" },
  { icon: "🔒", label: "Safe & secure checkout" },
];

/* ─── COMPONENTS ────────────────────────────────────────── */
function BillingToggle({ annual, onToggle }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          color: !annual ? "#0a0a0a" : "#999",
        }}
      >
        Monthly
      </span>

      <label
        style={{
          position: "relative",
          width: 46,
          height: 25,
          cursor: "pointer",
          display: "inline-block",
          flexShrink: 0,
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
            background: annual ? "#c8f000" : "#ccc",
            borderRadius: 100,
            transition: "background .3s",
          }}
        >
          <span
            style={{
              position: "absolute",
              width: 19,
              height: 19,
              left: 3,
              top: 3,
              background: "#0a0a0a",
              borderRadius: "50%",
              transform: annual ? "translateX(21px)" : "none",
              transition: "transform .3s",
            }}
          />
        </span>
      </label>

      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          color: annual ? "#0a0a0a" : "#999",
        }}
      >
        Annual
      </span>

      <span
        style={{
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          background: "#0a0a0a",
          color: "#c8f000",
          padding: "3px 8px",
          borderRadius: 4,
        }}
      >
        Save 30%
      </span>
    </div>
  );
}

function PlanCard({ plan, annual, selected, onClick }) {
  const price = annual ? plan.annual : plan.monthly;

  return (
    <div
      onClick={onClick}
      style={{
        background: plan.popular ? "#0a0a0a" : "#fff",
        border: `2px solid ${selected ? "#c8f000" : plan.popular ? "#c8f000" : "#e0ddd5"}`,
        borderRadius: 14,
        padding: "24px 20px",
        position: "relative",
        cursor: "pointer",
        boxShadow: selected ? "0 0 0 3px rgba(200,240,0,0.25)" : "none",
        transition: "border-color .2s, box-shadow .2s",
      }}
    >
      {plan.popular && (
        <div
          style={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#c8f000",
            color: "#0a0a0a",
            fontSize: 9.5,
            fontWeight: 800,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            padding: "3px 12px",
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
          fontSize: 9.5,
          fontWeight: 800,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          padding: "3px 9px",
          borderRadius: 4,
          marginBottom: 10,
          ...(plan.popular
            ? { background: "#c8f000", color: "#0a0a0a" }
            : plan.id === "agency"
            ? { background: "#1a1a1a", color: "#c8f000", border: "1px solid #333" }
            : { background: "#f4f2e8", color: "#666", border: "1px solid #e0ddd5" }),
        }}
      >
        {plan.tier}
      </span>

      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 24,
          letterSpacing: 0.5,
          color: plan.popular ? "#fff" : "#0a0a0a",
          marginBottom: 5,
        }}
      >
        {plan.name}
      </div>

      <p
        style={{
          fontSize: 12,
          color: plan.popular ? "#777" : "#666",
          lineHeight: 1.5,
          marginBottom: 16,
          minHeight: 36,
        }}
      >
        {plan.desc}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 3,
          paddingBottom: 14,
          marginBottom: 14,
          borderBottom: `1px solid ${plan.popular ? "#1e1e1e" : "#ede9e0"}`,
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: plan.popular ? "#666" : "#aaa",
            marginBottom: 5,
          }}
        >
          $
        </span>
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 46,
            lineHeight: 1,
            color: plan.popular ? "#c8f000" : "#0a0a0a",
          }}
        >
          {price}
        </span>
        <span style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>/mo</span>
      </div>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 18px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {plan.features.map((f) => (
          <li
            key={f}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
              fontSize: 12,
              color: plan.popular ? "#ccc" : "#333",
              lineHeight: 1.4,
            }}
          >
            <span
              style={{
                width: 15,
                height: 15,
                borderRadius: "50%",
                flexShrink: 0,
                marginTop: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: plan.popular ? "#c8f000" : plan.id === "agency" ? "#1a1a1a" : "#f0ede6",
                border: plan.id === "agency" ? "1px solid #333" : "none",
              }}
            >
              <svg width="7" height="6" viewBox="0 0 9 7" fill="none">
                <path
                  d="M1 3.5l2 2L8 1"
                  stroke={plan.popular ? "#0a0a0a" : plan.id === "agency" ? "#c8f000" : "#555"}
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {f}
          </li>
        ))}

        {plan.unavailable.map((f) => (
          <li
            key={f}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
              fontSize: 12,
              color: "#bbb",
              lineHeight: 1.4,
              opacity: 0.5,
            }}
          >
            <span
              style={{
                width: 15,
                height: 15,
                borderRadius: "50%",
                flexShrink: 0,
                marginTop: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: `1px solid ${plan.popular ? "#333" : "#ddd"}`,
              }}
            >
              <svg width="7" height="6" viewBox="0 0 9 7" fill="none">
                <path
                  d="M1 3.5l2 2L8 1"
                  stroke="#ccc"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {f}
          </li>
        ))}
      </ul>

      <a
        href="#"
        style={{
          display: "block",
          textAlign: "center",
          padding: "11px 0",
          borderRadius: 8,
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: "1px",
          textTransform: "uppercase",
          textDecoration: "none",
          ...(plan.popular
            ? { background: "#c8f000", color: "#0a0a0a" }
            : { background: "transparent", color: "#0a0a0a", border: "1.5px solid #d0ccc4" }),
        }}
      >
        {plan.btnLabel} →
      </a>
    </div>
  );
}

function Sidebar({ annual, onToggle, selectedPlan, onSelectPlan }) {
  const plan = PLANS.find((p) => p.id === selectedPlan) || PLANS[1];
  const price = annual ? plan.annual : plan.monthly;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ background: "#fff", border: "1.5px solid #e0ddd5", borderRadius: 14, padding: "20px 18px" }}>
        <div style={{ marginBottom: 14 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#aaa",
              marginBottom: 7,
            }}
          >
            Select Plan
          </div>

          <div style={{ display: "flex", gap: 5 }}>
            {PLANS.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectPlan(p.id)}
                style={{
                  flex: 1,
                  padding: "7px 2px",
                  borderRadius: 7,
                  border: `1.5px solid ${selectedPlan === p.id ? "#c8f000" : "#e8e5de"}`,
                  background: selectedPlan === p.id ? "#c8f000" : "#f9f8f4",
                  color: "#0a0a0a",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all .15s",
                }}
              >
                {p.tier}
              </button>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid #f0ede6", paddingTop: 14, marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#0a0a0a" }}>{plan.name}</span>
            <span
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 26,
                color: "#0a0a0a",
                lineHeight: 1,
              }}
            >
              ${price}
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#888",
                  fontFamily: "'Barlow', sans-serif",
                }}
              >
                /mo
              </span>
            </span>
          </div>
          <div style={{ fontSize: 11, color: "#aaa" }}>
            {annual ? "Billed annually" : "Billed monthly"} · Cancel anytime
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 14,
            padding: "9px 11px",
            background: "#f9f8f4",
            borderRadius: 8,
          }}
        >
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              color: !annual ? "#0a0a0a" : "#aaa",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Monthly
          </span>

          <label
            style={{
              position: "relative",
              width: 36,
              height: 20,
              cursor: "pointer",
              display: "inline-block",
              flexShrink: 0,
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
                background: annual ? "#c8f000" : "#ccc",
                borderRadius: 100,
                transition: "background .3s",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  width: 14,
                  height: 14,
                  left: 3,
                  top: 3,
                  background: "#0a0a0a",
                  borderRadius: "50%",
                  transform: annual ? "translateX(16px)" : "none",
                  transition: "transform .3s",
                }}
              />
            </span>
          </label>

          <span
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              color: annual ? "#0a0a0a" : "#aaa",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Annual
          </span>

          {annual && (
            <span
              style={{
                marginLeft: "auto",
                fontSize: 9,
                fontWeight: 800,
                background: "#0a0a0a",
                color: "#c8f000",
                padding: "2px 6px",
                borderRadius: 3,
                letterSpacing: "0.5px",
              }}
            >
              −30%
            </span>
          )}
        </div>

        <a
          href="#"
          style={{
            display: "block",
            textAlign: "center",
            background: "#c8f000",
            color: "#0a0a0a",
            fontWeight: 800,
            fontSize: 11.5,
            letterSpacing: "1px",
            textTransform: "uppercase",
            padding: "12px 0",
            borderRadius: 8,
            textDecoration: "none",
            marginBottom: 8,
          }}
        >
          ▶ Start Free Trial
        </a>

        <a
          href="#"
          style={{
            display: "block",
            textAlign: "center",
            background: "#0a0a0a",
            color: "#fff",
            fontWeight: 800,
            fontSize: 11.5,
            letterSpacing: "1px",
            textTransform: "uppercase",
            padding: "12px 0",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          ▶ Get Started Now
        </a>

        <p
          style={{
            fontSize: 10.5,
            color: "#bbb",
            textAlign: "center",
            marginTop: 10,
            lineHeight: 1.5,
          }}
        >
          14-day free trial · No credit card required
        </p>
      </div>

      <div
        style={{
          background: "#fff",
          border: "1.5px solid #e0ddd5",
          borderRadius: 14,
          padding: "16px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {TRUST_BADGES.map(({ icon, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <span
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#f4f2e8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                flexShrink: 0,
              }}
            >
              {icon}
            </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Reviews() {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 30,
          letterSpacing: 0.5,
          color: "#c8f000",
          marginBottom: 4,
        }}
      >
        What our users say
      </h2>
      <p style={{ fontSize: 13, color: "#777", marginBottom: 22 }}>
        Join 12,400+ professionals growing on LinkedIn with Linkziy.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {REVIEWS.map(({ initials, color, name, date, text }) => (
          <div key={name} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: color,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 15,
                color: "#fff",
              }}
            >
              {initials}
            </span>

            <div>
              <div style={{ fontSize: 13.5, color: "#333", lineHeight: 1.65, marginBottom: 5 }}>
                <span
                  style={{
                    fontSize: 18,
                    color: "#c8f000",
                    lineHeight: 0,
                    verticalAlign: "middle",
                    marginRight: 3,
                  }}
                >
                  "
                </span>
                {text}
                <span
                  style={{
                    fontSize: 18,
                    color: "#c8f000",
                    lineHeight: 0,
                    verticalAlign: "middle",
                    marginLeft: 3,
                  }}
                >
                  "
                </span>
              </div>
              <div style={{ fontSize: 11.5, color: "#aaa" }}>
                — {name}, {date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Promises() {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 30,
          letterSpacing: 0.5,
          color: "#c8f000",
          marginBottom: 18,
        }}
      >
        Our promise to you
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {PROMISES.map(({ title, body }) => (
          <div
            key={title}
            style={{
              background: "#fff",
              border: "1.5px solid #e8e5de",
              borderRadius: 11,
              padding: "20px 22px",
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 15, color: "#0a0a0a", marginBottom: 7 }}>
              {title}
            </div>
            <p style={{ fontSize: 13.5, color: "#555", lineHeight: 1.7 }}>{body}</p>
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
        background: open ? "#f7fae5" : "#0a0a0a",
        border: `1.5px solid ${open ? "#c8f000" : "#1a1a1a"}`,
        borderRadius: 9,
        padding: "14px 16px",
        cursor: "pointer",
        transition: "background .2s, border-color .2s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: open ? "#0a0a0a" : "#fff" }}>{q}</span>
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: open ? "#c8f000" : "transparent",
            border: `1.5px solid ${open ? "#c8f000" : "#444"}`,
            color: open ? "#0a0a0a" : "#777",
            fontSize: 13,
            transform: open ? "rotate(45deg)" : "none",
            transition: "all .22s",
          }}
        >
          +
        </span>
      </div>

      {open && <p style={{ fontSize: 13.5, color: "#555", lineHeight: 1.65, marginTop: 10 }}>{a}</p>}
    </div>
  );
}

function FaqSection() {
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 30,
            letterSpacing: 0.5,
            color: "#c8f000",
          }}
        >
          FAQs
        </h2>

        <a href="#" style={{ fontSize: 12.5, color: "#c8f000", textDecoration: "none", fontWeight: 700 }}>
          See all FAQs →
        </a>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {FAQS.map(({ q, a }) => (
          <FaqItem key={q} q={q} a={a} />
        ))}
      </div>
    </div>
  );
}

function QuickStats() {
  const rows = [
    ["Active users", "12,400+"],
    ["Posts generated", "3.2 million"],
    ["Average rating", "4.9 / 5.0"],
    ["Free trial length", "14 days"],
    ["Credit card required", "No"],
    ["Cancellation policy", "Cancel anytime"],
  ];

  return (
    <div style={{ marginBottom: 48 }}>
      <h2
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 30,
          letterSpacing: 0.5,
          color: "#c8f000",
          marginBottom: 16,
        }}
      >
        Quick stats
      </h2>

      <div style={{ background: "#fff", border: "1.5px solid #e8e5de", borderRadius: 11, overflow: "hidden" }}>
        {rows.map(([label, value], i) => (
          <div
            key={label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 18px",
              borderBottom: i < rows.length - 1 ? "1px dotted #e8e5de" : "none",
              background: i % 2 === 0 ? "#fff" : "#faf9f5",
            }}
          >
            <span style={{ fontSize: 13.5, color: "#555" }}>{label}</span>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: "#0a0a0a" }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── PAGE ──────────────────────────────────────────────── */
export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("pro");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Barlow', sans-serif; background: #f4f2e8; color: #0a0a0a; overflow-x: hidden; }
        a:hover { opacity: 0.85; }

        @media (max-width: 1100px) {
          .pricing-layout {
            grid-template-columns: 1fr !important;
          }

          .pricing-cards {
            grid-template-columns: 1fr !important;
          }

          .pricing-sidebar {
            min-height: auto !important;
          }

          .pricing-sidebar-sticky {
            position: static !important;
            top: auto !important;
          }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f4f2e8", fontFamily: "'Barlow', sans-serif" }}>
        <Navbar />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 32px 0" }}>
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
              <span
                style={{
                  background: "#c8f000",
                  color: "#0a0a0a",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  borderRadius: 4,
                }}
              >
                💰 Pricing
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "#888",
                }}
              >
                Simple &amp; Transparent
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                letterSpacing: 1,
                color: "#0a0a0a",
                lineHeight: 0.95,
                marginBottom: 12,
              }}
            >
              Pick Your <span style={{ color: "#c8f000" }}>Growth</span>{" "}
              <span style={{ WebkitTextStroke: "2px #0a0a0a", color: "transparent" }}>Plan.</span>
            </h1>

            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.65, maxWidth: 480 }}>
              No hidden fees. No contracts. Just results. Start free for 14 days — no credit card required.
            </p>
          </div>

          <div
            className="pricing-layout"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 310px",
              gap: 32,
              alignItems: "start",
            }}
          >
            <div>
              <div style={{ marginBottom: 44 }}>
                <BillingToggle annual={annual} onToggle={() => setAnnual((a) => !a)} />

                <div
                  className="pricing-cards"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 12,
                    alignItems: "start",
                  }}
                >
                  {PLANS.map((plan) => (
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      annual={annual}
                      selected={selectedPlan === plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                    />
                  ))}
                </div>
              </div>

              <hr style={{ border: "none", borderTop: "1.5px dashed #d8d4cc", marginBottom: 44 }} />
              <Reviews />
              <hr style={{ border: "none", borderTop: "1.5px dashed #d8d4cc", marginBottom: 44 }} />
              <Promises />
              <hr style={{ border: "none", borderTop: "1.5px dashed #d8d4cc", marginBottom: 44 }} />
              <FaqSection />
              <hr style={{ border: "none", borderTop: "1.5px dashed #d8d4cc", marginBottom: 44 }} />
              <QuickStats />
            </div>

            <div
              className="pricing-sidebar"
              style={{
                alignSelf: "stretch",
                minHeight: "100%",
              }}
            >
              <div
                className="pricing-sidebar-sticky"
                style={{
                  position: "sticky",
                  top: 110,
                }}
              >
                <Sidebar
                  annual={annual}
                  onToggle={() => setAnnual((a) => !a)}
                  selectedPlan={selectedPlan}
                  onSelectPlan={setSelectedPlan}
                />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}