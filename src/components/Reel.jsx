import { useLayoutEffect, useRef, useState } from 'react'
import { STEPS } from '../menu'
import { ScrollTrigger } from '../motion'
import Film from './Film'

const SCENES = [
  {
    kicker: 'Our story',
    title: 'Some flavours cannot be rushed.',
    text: 'At Biriyani Kaksh, dum is more than a recipe. The handi is sealed, the flame stays low, and the rice is finished in Bodra Chowk, Tambo.',
  },
  ...STEPS.map((step) => ({ kicker: step.n, title: step.title, text: step.text })),
  {
    kicker: 'The table',
    title: 'Thali, curry, and the open handi.',
    text: 'Same pot, same day. You pick from the board, we pack it, and the summary goes to the kitchen on WhatsApp.',
  },
]

const LAST = SCENES.length - 1

export default function Reel() {
  const root = useRef(null)
  const [step, setStep] = useState(0)

  useLayoutEffect(() => {
    const el = root.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      el.style.setProperty('--p', '0')
      return undefined
    }

    const go = (index) => {
      const st = ScrollTrigger.getAll().find((item) => item.trigger === el)
      const lenis = window.__lenis
      if (!st || !lenis) return
      const next = Math.min(LAST, Math.max(0, index))
      const y = st.start + (st.end - st.start) * (next / LAST)
      lenis.scrollTo(y, { duration: 1.1 })
    }
    window.__bkJump = go

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: () => `+=${window.innerHeight * LAST}`,
      pin: true,
      scrub: 0.7,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress * LAST
        el.style.setProperty('--p', p.toFixed(3))
        const next = Math.min(LAST, Math.round(p))
        setStep((prev) => (prev === next ? prev : next))
      },
    })

    return () => {
      if (window.__bkJump === go) delete window.__bkJump
      st.kill(true)
    }
  }, [])

  const scene = SCENES[step]

  return (
    <section className="reel" id="reel" ref={root}>
      <div className="reel-copy">
        <p className="eyebrow">{scene.kicker}</p>
        <h2>{scene.title}</h2>
        <p>{scene.text}</p>
        <ol>
          {SCENES.map((item, index) => (
            <li key={item.title}>
              <button type="button" className={index === step ? 'is-on' : ''} onClick={() => window.__bkJump?.(index)}>
                {item.kicker}
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="reel-stage">
        <Film />
      </div>
      <div className="reel-bar" aria-hidden="true">
        <i />
      </div>
    </section>
  )
}
