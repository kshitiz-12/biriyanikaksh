import { Link } from 'react-router-dom'
import { MENU } from '../menu'
import { releaseScroll } from '../motion'

const POINTS = [
  ['Authentic recipes', 'Hyderabadi and Kolkata dum, cooked the way the handi was taught.'],
  ['Slow dum cooking', 'Sealed pot, low flame, rice finished without a stir.'],
  ['Fresh ingredients', 'Spices, mint and meat prepped the same day they are served.'],
  ['Hygienic & fresh', 'One kitchen, one counter, packed when you ask.'],
]

export default function HomeMore() {
  const biryani = MENU[0]

  return (
    <>
      <section className="house">
        <div>
          <p className="eyebrow">The house</p>
          <h2>A short board, cooked to order.</h2>
          <p>
            Biriyani Kaksh cooks from one counter in Tambo. Three dum biryanis, thalis, curries and a few extras. You choose the size, we pack it, and the summary reaches the kitchen on WhatsApp.
          </p>
        </div>
        <ul>
          {POINTS.map(([title, text]) => (
            <li key={title}>
              <b>{title}</b>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="board-tease">
        <header>
          <p className="eyebrow">From the board</p>
          <h2>Start with the dum.</h2>
          <Link to="/menu" onClick={releaseScroll}>
            See the full menu →
          </Link>
        </header>
        <ul>
          {biryani.items.map((item) => (
            <li key={item.id}>
              <img src={item.img} alt="" />
              <b>{item.name}</b>
              <span>{item.blurb}</span>
              <em>From ₹{item.options[0].price}</em>
            </li>
          ))}
        </ul>
      </section>

      <section className="visit-strip">
        <div>
          <p className="eyebrow">Visit</p>
          <h2>Bodra Chowk, Tambo.</h2>
          <p>Open 11:00 AM – 11:00 PM, every day. Dine in, takeaway, or send the order on WhatsApp.</p>
          <div className="hero-cta">
            <Link className="btn gold" to="/contact" onClick={releaseScroll}>
              Contact us
            </Link>
            <Link className="btn line" to="/menu" onClick={releaseScroll}>
              Order now
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
