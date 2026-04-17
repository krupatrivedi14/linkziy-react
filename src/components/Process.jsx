import useReveal from '../hooks/useReveal'
import styles from './Process.module.css'

const STEPS = [
  { num: '01', title: 'Connect LinkedIn',  desc: 'One-click OAuth connection. No passwords, no risk. Securely linked in under 60 seconds.' },
  { num: '02', title: 'Define Your ICP',   desc: 'Filter by title, industry, seniority, or company size. Import your own CSV if you already have leads.' },
  { num: '03', title: 'Launch Sequences', desc: 'AI writes personalized messages for each prospect. Set your schedule, hit launch, walk away.' },
  { num: '04', title: 'Post & Grow',       desc: 'Generate and schedule your LinkedIn content simultaneously. Outbound and inbound, in parallel.' },
]

export default function Process() {
  const ref = useReveal()

  return (
    <section id="process" className={styles.section} ref={ref}>
      <div className={`${styles.header} reveal`}>
        <div className="sec-label" style={{ justifyContent: 'center' }}>
          <span className="sec-label-dot" /> Process
        </div>
        <div className="big-h" style={{ textAlign: 'center' }}>UP IN MINUTES.</div>
        <div className="big-h" style={{ textAlign: 'center' }}>RESULTS IN DAYS.</div>
      </div>

      <div className={styles.grid}>
        {STEPS.map((step, i) => (
          <article key={step.num} className={`${styles.card} reveal reveal-d${i + 1}`}>
            <div className={styles.stepNum}>{step.num}</div>
            <div className={styles.arrow}>→</div>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.desc}>{step.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
