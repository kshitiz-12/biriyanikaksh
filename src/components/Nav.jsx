import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../cart'
import { releaseScroll } from '../motion'

const MORE = [
  ['/', 'Home'],
  ['/menu', 'Menu'],
  ['/contact', 'Contact'],
]

export default function Nav() {
  const { count, setOpen } = useCart()
  const [menu, setMenu] = useState(false)

  return (
    <header className="nav">
      <NavLink className="brand" to="/" end onClick={() => setMenu(false)}>
        <img src="/logo.png" alt="Biriyani कक्ष" />
      </NavLink>
      <nav className={menu ? 'is-open' : ''}>
        {MORE.map(([to, label]) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={() => {
              setMenu(false)
              releaseScroll()
            }}
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="nav-actions">
        <button className="cart-btn" type="button" aria-label={count ? `Cart, ${count} items` : 'Cart'} onClick={() => setOpen(true)}>
          <CartIcon />
          {count > 0 ? <em>{count}</em> : null}
        </button>
        <NavLink
          className="wa-btn"
          to="/menu"
          onClick={() => {
            setMenu(false)
            releaseScroll()
          }}
        >
          <WaIcon />
          Order on WhatsApp
        </NavLink>
        <button className="burger" type="button" aria-label="Menu" onClick={() => setMenu((v) => !v)}>
          <i />
          <i />
          <i />
        </button>
      </div>
    </header>
  )
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 7h15l-1.6 8.2a2 2 0 0 1-2 1.6H9.2a2 2 0 0 1-2-1.5L5 4H3" />
      <circle cx="9" cy="20" r="1.2" />
      <circle cx="17" cy="20" r="1.2" />
    </svg>
  )
}

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4a8 8 0 0 0-6.9 12L4 20l4.1-1.1A8 8 0 1 0 12 4z" />
      <path d="M9.2 10.2c.2 1.6 1.6 3.2 3.2 3.8l1-.9c.2-.2.5-.2.7 0l1.2.7c.2.2.2.5 0 .7-.6.6-1.4.8-2.2.6-2-.6-3.8-2.2-4.6-4.2-.2-.8 0-1.6.6-2.2.2-.2.5-.2.7 0l.7 1.2c.1.2 0 .5-.1.7l-.2.6z" />
    </svg>
  )
}
