import useReveal from '../hooks/useReveal'
import styles from './SplitSection.module.css'

const OUTREACH_ITEMS = [
  'Multi-step sequence builder',
  'AI-personalized icebreakers',
  'Smart inbox management',
  'CRM sync (HubSpot, Pipedrive, Salesforce)',
  'White-label for agencies',
]

const CONTENT_ITEMS = [
  'Viral hook generator',
  'Carousel & document creator',
  'Custom tone & style training',
  'Content calendar & scheduler',
  'Repurpose from any format',
]

export default function SplitSection() {
  const ref = useReveal()

  return (
    <div id="split" className={styles.wrap} ref={ref}>
      {/* Left — Outreach */}
      <div className={`${styles.left} reveal`}>
        <div className={styles.tagOut}>🚀 Outreach</div>
        <h2 className={styles.heading}>PIPELINE.<br />ON AUTOPILOT.</h2>
        <p className={styles.desc}>
          Run campaigns that feel human-crafted but scale like automation.
          Multi-touch sequences from connection to close, with AI personalization at every step.
        </p>
        <ul className={styles.list}>
          {OUTREACH_ITEMS.map((item) => (
            <li key={item}><span className={styles.check}>✓</span>{item}</li>
          ))}
        </ul>
        <a href="/features/outreach" className={styles.link}>Explore Outreach Features →</a>
        <div className={styles.bgNum} aria-hidden="true">01</div>
      </div>

      {/* Right — Content */}
      <div className={`${styles.right} reveal`}>
        <div className={styles.tagCont}>✨ Content</div>
        <h2 className={styles.headingLight}>BRAND THAT<br />ATTRACTS.</h2>
        <p className={styles.descLight}>
          The AI learns your voice and writes LinkedIn-native content that generates
          inbound leads. Schedule a month of posts in an afternoon.
        </p>
        <ul className={styles.listLight}>
          {CONTENT_ITEMS.map((item) => (
            <li key={item}><span className={styles.check}>✓</span>{item}</li>
          ))}
        </ul>
        <a href="/features/content" className={styles.linkLight}>Explore Content Features →</a>
        <div className={styles.bgNum} aria-hidden="true">02</div>
      </div>
    </div>
  )
}
