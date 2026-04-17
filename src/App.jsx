import Cursor       from './components/Cursor'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import Marquee      from './components/Marquee'
import Features     from './components/Features'
import Process      from './components/Process'
import SplitSection from './components/SplitSection'
import StatsBar     from './components/StatsBar'
import Pricing      from './components/Pricing'
import Reviews      from './components/Reviews'
import Scheduler    from './components/Scheduler'
import CTA          from './components/CTA'
import Footer       from './components/Footer'

export default function App() {
  return (
    <>
      {/* Custom cursor — rendered outside page flow */}
      <Cursor />

      {/* Fixed navigation */}
      <Navbar />

      {/* Page sections — in order */}
      <main>
        <Hero />
        <Marquee />
        <Features />
        <Process />
        <SplitSection />
        <StatsBar />
        <Pricing />
        <Reviews />
        <Scheduler />
        <CTA />
      </main>

      <Footer />
    </>
  )
}
