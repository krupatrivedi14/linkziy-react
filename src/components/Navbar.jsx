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
      <span className={styles.scanLine} aria-hidden="true" />

      <a href="/" className={styles.logo}>
        <img src="/logo-removebg-preview.png" alt="Linkziy Logo" className={styles.logoImg} />
        <span className={styles.logoText}>Linkziy</span>
      </a>

      <ul className={styles.links}>
        <li><a href="#features">Features</a></li>
        <li><a href="#solutions">Solutions</a></li>
        <li><a href="#built">Built for</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className={styles.actions}>
        <button
          className={styles.btnLogin}
          onClick={() => (window.location.href = '/login')}
        >
          Log In
        </button>

        <button
          className={styles.btnStart}
          onClick={() => (window.location.href = '/signup')}
        >
          Start Free
        </button>
      </div>
    </nav>
  )
}