import { Link } from 'react-router-dom'
import { STEPS } from '../menu'
import { releaseScroll } from '../motion'

const MARKS = ['Authentic Recipes', 'Slow Dum Cooking', 'Fresh Ingredients', 'Hygienic & Fresh']

export default function Hero() {
  return (
    <section className="hero" id="top">
      <img className="hero-bg" src="/photos/hero-scene.png" alt="" />
      <div className="hero-shade" />

      <ol className="rail">
        {STEPS.map((step, index) => (
          <li key={step.n} className={index === 0 ? 'is-on' : ''}>
            <button type="button" onClick={() => window.__bkJump?.(index + 1)}>
              <b>{step.n}</b>
              <span>{step.title}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="hero-copy">
        <p className="eyebrow">Flavours find a home here</p>
        <h1>
          <img className="lockup" src="/logo.png" alt="Biriyani कक्ष. More than a meal. It’s an experience." />
        </h1>
        <p className="sub">Aromatic spices, slow-cooked perfection and flavours that stay with you.</p>
        <div className="hero-cta">
          <Link className="btn gold" to="/menu" onClick={releaseScroll}>
            Order Now <span>→</span>
          </Link>
          <Link className="btn line" to="/menu" onClick={releaseScroll}>
            Explore Menu
          </Link>
        </div>
      </div>

      <div className="hero-foot">
        <ul className="pills">
          {MARKS.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
        <button className="scroll-cue" type="button" onClick={() => window.__bkJump?.(0)}>
          Scroll to explore
          <b />
        </button>
      </div>
    </section>
  )
}

