import useReveal from '../hooks/useReveal'
import styles from './Pricing.module.css'

const PLANS = [
  {
    tier: 'Starter',
    price: '49',
    desc: 'For solo founders and individuals building their LinkedIn presence.',
    features: [
      '1 LinkedIn account',
      '500 connection requests/mo',
      '3 active campaigns',
      '50 AI content posts/mo',
      'Basic analytics',
      'Email support',
    ],
    cta: 'Get Started',
    ctaStyle: 'outline',
    href: '/signup?plan=starter',
  },
  {
    tier: 'Pro',
    price: '99',
    desc: 'For sales teams scaling outreach and building a strong LinkedIn brand.',
    features: [
      '3 LinkedIn accounts',
      '2,000 connection requests/mo',
      'Unlimited campaigns',
      'Unlimited AI content',
      'CRM integrations',
      'Team inbox',
      'Advanced analytics',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    ctaStyle: 'lime',
    featured: true,
    badge: 'Most Popular',
    href: '/signup?plan=pro',
  },
  {
    tier: 'Agency',
    price: '249',
    desc: 'For agencies managing multiple clients with white-label needs.',
    features: [
      '10 LinkedIn accounts',
      '10,000 connection requests/mo',
      'White-label dashboard',
      'Client management portal',
      'API access',
      'Custom AI voice training',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    ctaStyle: 'outline',
    href: '/contact',
  },
]

export default function Pricing() {
  const ref = useReveal()

  return (
    <section id="pricing" className={styles.section} ref={ref}>
      <div className={`${styles.header} reveal`}>
        <div className="sec-label" style={{ justifyContent: 'center' }}>
          <span className="sec-label-dot" /> Pricing
        </div>
        <div className="big-h" style={{ textAlign: 'center' }}>SIMPLE.</div>
        <div className="big-h lime" style={{ textAlign: 'center' }}>TRANSPARENT.</div>
      </div>

      <div className={styles.grid}>
        {PLANS.map((plan, i) => (
          <article
            key={plan.tier}
            className={`${styles.card} ${plan.featured ? styles.featured : ''} reveal reveal-d${i + 1}`}
          >
            {plan.badge && <div className={styles.badge}>{plan.badge}</div>}
            <div className={styles.tier}>{plan.tier}</div>
            <div className={styles.amount}>
              <span className={styles.dollar}>$</span>
              <span className={styles.price}>{plan.price}</span>
              <span className={styles.mo}>/mo</span>
            </div>
            <p className={styles.desc}>{plan.desc}</p>
            <div className={styles.divider} />
            <ul className={styles.features}>
              {plan.features.map((f) => (
                <li key={f}>
                  <span className={styles.dot} aria-hidden="true">✦</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={`${styles.btn} ${plan.ctaStyle === 'lime' ? styles.btnLime : styles.btnOutline}`}
              onClick={() => window.location.href = plan.href}
            >
              {plan.cta}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
