import { Routes, Route } from "react-router-dom";

import Cursor       from './components/Cursor'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import Marquee      from './components/Marquee'
import Features     from './components/Features'
import Process      from './components/Process'
import SplitSection from './components/SplitSection'
import StatsBar     from './components/StatsBar'
import PricingSection from './components/Pricing'   // 👈 rename to avoid conflict
import Reviews      from './components/Reviews'
import Scheduler    from './components/Scheduler'
import CTA          from './components/CTA'
import Footer       from './components/Footer'

import PricingPage  from './pages/Pricing'          // 👈 your full pricing page

/* ─── HOME PAGE ───────────────────────── */
function Home() {
  return (
    <>
      <Cursor />
      <Navbar />

      <main>
        <Hero />
        <Marquee />
        <Features />
        <Process />
        <SplitSection />
        <StatsBar />
        <PricingSection />   {/* 👈 this is your landing preview */}
        <Reviews />
        <Scheduler />
        <CTA />
      </main>

      <Footer />
    </>
  );
}

/* ─── APP ROUTES ───────────────────────── */
export default function App() {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<Home />} />

      {/* Full pricing page */}
      <Route path="/pricing" element={<PricingPage />} />
    </Routes>
  );
}