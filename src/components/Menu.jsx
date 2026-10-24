import { useState } from 'react'
import { useCart } from '../cart'
import { MENU } from '../menu'

export default function Menu() {
  const [tab, setTab] = useState(MENU[0].id)
  const [detail, setDetail] = useState(null)
  const group = MENU.find((entry) => entry.id === tab) || MENU[0]

  return (
    <section className="menu" id="menu">
      <header className="menu-hero">
        <img src="/photos/reveal.png" alt="Chicken dum biryani at Biriyani Kaksh" />
        <div>
          <p className="eyebrow">Our menu</p>
          <h1>Biryani menu in Chaibasa.</h1>
          <p>Hyderabadi dum, Kolkata dum and paneer biryani at Biriyani Kaksh, Bodra Chowk. Pick a size and send the order on WhatsApp.</p>
        </div>
      </header>
      <div className="tabs" role="tablist">
        {MENU.map((entry) => (
          <button key={entry.id} type="button" className={entry.id === tab ? 'is-on' : ''} onClick={() => setTab(entry.id)}>
            {entry.title}
          </button>
        ))}
      </div>
      <p className="menu-note">{group.note}</p>
      <ul className="cards">
        {group.items.map((item) => (
          <Dish key={item.id} item={item} onOpen={() => setDetail(item)} />
        ))}
      </ul>
      {detail ? <Detail item={detail} onClose={() => setDetail(null)} /> : null}
    </section>
  )
}

function Dish({ item, onOpen }) {
  const { add } = useCart()
  const [optionId, setOptionId] = useState(item.options[0].id)
  const option = item.options.find((entry) => entry.id === optionId) || item.options[0]

  return (
    <li className="card">
      <button className="card-photo" type="button" onClick={onOpen}>
        <img src={item.img} alt={item.name} />
      </button>
      <div className="card-body">
        <b>{item.name}</b>
        <p>{item.blurb}</p>
        <div className="sizes">
          {item.options.map((entry) => (
            <button key={entry.id} type="button" className={entry.id === option.id ? 'is-on' : ''} onClick={() => setOptionId(entry.id)}>
              {entry.label}
              <small>₹{entry.price}</small>
            </button>
          ))}
        </div>
        <button className="add-order" type="button" onClick={() => add(item, option)}>
          Add to Order · ₹{option.price}
        </button>
      </div>
    </li>
  )
}

function Detail({ item, onClose }) {
  const { add } = useCart()
  const [optionId, setOptionId] = useState(item.options[0].id)
  const option = item.options.find((entry) => entry.id === optionId) || item.options[0]

  return (
    <div className="sheet">
      <button className="cart-scrim is-on" type="button" aria-label="Close dish" onClick={onClose} />
      <article>
        <img src={item.img} alt={item.name} />
        <div>
          <p className="eyebrow">Dish</p>
          <h3>{item.name}</h3>
          <p>{item.blurb}</p>
          <div className="sizes">
            {item.options.map((entry) => (
              <button key={entry.id} type="button" className={entry.id === option.id ? 'is-on' : ''} onClick={() => setOptionId(entry.id)}>
                {entry.label}
                {entry.detail ? <small>{entry.detail}</small> : null}
                <small>₹{entry.price}</small>
              </button>
            ))}
          </div>
          <button
            className="add-order"
            type="button"
            onClick={() => {
              add(item, option)
              onClose()
            }}
          >
            Add to Order · ₹{option.price}
          </button>
        </div>
      </article>
    </div>
  )
}
