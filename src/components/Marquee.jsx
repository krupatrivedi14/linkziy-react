import styles from './Marquee.module.css'

const ITEMS = [
  'LinkedIn Outreach',
  'AI Content Generation',
  'Smart Sequences',
  'White Label Agency',
  'CRM Integration',
  'Viral Hook Generator',
  'LinkedIn Safe Automation',
  'Content Scheduler',
]

export default function Marquee() {
  // Duplicate for seamless loop
  const allItems = [...ITEMS, ...ITEMS]

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.track}>
        {allItems.map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.star}>✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
