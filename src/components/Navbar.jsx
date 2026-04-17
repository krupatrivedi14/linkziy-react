import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="/" className={styles.logo}>
        LINK<span className={styles.hl}>ZIY</span>
      </a>

      <ul className={styles.links}>
        <li><a href="#features">Features</a></li>
        <li><a href="#process">Process</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#reviews">Reviews</a></li>
      </ul>

      <div className={styles.actions}>
        <button className={styles.btnLogin} onClick={() => window.location.href = '/login'}>
          Sign in
        </button>
        <button className={styles.btnStart} onClick={() => window.location.href = '/signup'}>
          Start Free
        </button>
      </div>
    </nav>
  )
}
