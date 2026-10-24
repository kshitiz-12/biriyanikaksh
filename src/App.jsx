import { useEffect, useLayoutEffect } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger, releaseScroll } from './motion'
import { CartProvider } from './cart'
import { ADDRESS, PHONES } from './menu'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Reel from './components/Reel'
import Menu from './components/Menu'
import Cart from './components/Cart'
import Contact from './components/Contact'
import HomeMore from './components/HomeMore'
import Seo from './components/Seo'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true })
    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const ticker = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      gsap.ticker.remove(ticker)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  return (
    <CartProvider>
      <Seo />
      <Nav />
      <OnRoute />
      <Routes>
        <Route path="/" element={<><Hero /><Reel /><HomeMore /></>} />
        <Route path="/menu" element={<main className="page"><Menu /></main>} />
        <Route path="/contact" element={<main className="page"><Contact /></main>} />
        <Route path="/story" element={<Navigate to="/" replace />} />
        <Route path="/gallery" element={<Navigate to="/" replace />} />
        <Route path="/making" element={<Navigate to="/" replace />} />
      </Routes>
      <footer className="site-foot">
        <div>
          <img src="/logo.png" alt="Biriyani कक्ष" />
          <p>Flavourful you can’t forget. Dum biryani from a single counter in Tambo.</p>
        </div>
        <div>
          <b>Visit</b>
          <span>{ADDRESS}</span>
          <span>11:00 AM – 11:00 PM, every day</span>
        </div>
        <div>
          <b>Call</b>
          {PHONES.map((phone) => (
            <a key={phone} href={`tel:+91${phone}`}>
              {phone}
            </a>
          ))}
        </div>
        <div>
          <b>Pages</b>
          <Link to="/" onClick={releaseScroll}>Home</Link>
          <Link to="/menu" onClick={releaseScroll}>Menu</Link>
          <Link to="/contact" onClick={releaseScroll}>Contact</Link>
        </div>
        <p className="fine">Biriyani Kaksh · {ADDRESS}</p>
      </footer>
      <Cart />
    </CartProvider>
  )
}

function OnRoute() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    const lenis = window.__lenis
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(frame)
  }, [pathname])
  return null
}
