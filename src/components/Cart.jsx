import { useEffect, useState } from 'react'
import { useCart } from '../cart'
import { orderText, whatsappUrl } from '../menu'

export default function Cart() {
  const { lines, open, setOpen, setQty, clear, total, count } = useCart()
  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, setOpen])

  const text = lines.length ? orderText(lines, name, note) : 'Hi Biriyani Kaksh, I would like to place an order.'
  const href = whatsappUrl(text)

  return (
    <>
      <button className={`cart-scrim${open ? ' is-on' : ''}`} type="button" aria-label="Close cart" onClick={() => setOpen(false)} />
      <aside className={`cart${open ? ' is-on' : ''}`} aria-hidden={!open}>
        <header>
          <div>
            <p className="eyebrow">Your order</p>
            <h2>{sent ? 'Order sent' : count ? `${count} item${count === 1 ? '' : 's'}` : 'Empty handi'}</h2>
          </div>
          <div className="cart-tools">
            {lines.length > 0 && !sent ? (
              <button className="text-btn" type="button" onClick={clear}>
                Clear all
              </button>
            ) : null}
            <button className="cart-back" type="button" onClick={() => setOpen(false)}>
              Back to menu
            </button>
          </div>
        </header>
        {sent ? (
          <div className="sent">
            <b>✓</b>
            <p>Your order summary is open on WhatsApp. The kitchen reads it from there.</p>
            <button
              className="btn gold"
              type="button"
              onClick={() => {
                setSent(false)
                setOpen(false)
              }}
            >
              View menu again
            </button>
          </div>
        ) : null}

        {!sent && lines.length === 0 ? (
          <p className="cart-empty">
            Add biryani, thali or curry from the board. The summary is sent to the Kaksh WhatsApp, ready for the kitchen.
          </p>
        ) : null}
        {!sent && lines.length > 0 ? (
          <ul className="cart-lines">
            {lines.map((line) => (
              <li key={line.key}>
                <img src={line.img || '/photos/reveal.png'} alt="" />
                <div>
                  <b>{line.name}</b>
                  <span>
                    {line.optionLabel}
                    {line.detail ? ` · ${line.detail}` : ''} · ₹{line.price}
                  </span>
                </div>
                <div className="qty">
                  <button type="button" onClick={() => setQty(line.key, line.qty - 1)} aria-label="Decrease">
                    −
                  </button>
                  <em>{line.qty}</em>
                  <button type="button" onClick={() => setQty(line.key, line.qty + 1)} aria-label="Increase">
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
        {!sent ? (
          <>
            <label>
              Name
              <input value={name} onChange={(event) => setName(event.target.value)} placeholder="For the parcel" />
            </label>
            <label>
              Note
              <input value={note} onChange={(event) => setNote(event.target.value)} placeholder="Less spice, extra raita…" />
            </label>
            <footer>
              <p>
                <span>Total</span>
                <b>₹{total}</b>
              </p>
              <a className="btn send" href={href} target="_blank" rel="noreferrer" onClick={() => lines.length && setSent(true)}>
                Order on WhatsApp
              </a>
              <small>You will be redirected to WhatsApp with this summary.</small>
            </footer>
          </>
        ) : null}
      </aside>
      {count > 0 && !open ? (
        <button className="order-dock" type="button" onClick={() => setOpen(true)}>
          <span>
            {count} item{count === 1 ? '' : 's'} · ₹{total}
          </span>
          <b>View order</b>
        </button>
      ) : null}
    </>
  )
}
