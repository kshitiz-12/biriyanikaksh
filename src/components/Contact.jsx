import { useState } from 'react'
import { ADDRESS, PHONES, whatsappUrl } from '../menu'

const MAP = 'https://www.google.com/maps/search/?api=1&query=Bodra+Chowk+Tambo+Chaibasa'

export default function Contact() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const text = [
    'Hi Biriyani Kaksh,',
    name.trim() ? `I am ${name.trim()}.` : 'I would like to get in touch.',
    phone.trim() ? `My number is ${phone.trim()}.` : '',
    note.trim(),
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className="visit" id="contact">
      <div className="visit-intro">
        <p className="eyebrow">Find us</p>
        <h1>Biriyani Kaksh, Bodra Chowk, Chaibasa.</h1>
        <p className="tag">Flavourful you can’t forget</p>
        <div className="modes">
          <span>Dine in</span>
          <span>Takeaway</span>
          <a href={whatsappUrl('Hi Biriyani Kaksh, I would like to place an order.')} target="_blank" rel="noreferrer">
            Order via WhatsApp
          </a>
        </div>
      </div>
      <div className="visit-grid">
        <img src="/photos/dum.png" alt="Sealed copper handi on a low flame" />
        <ul>
          <li>
            <b>Address</b>
            <span>{ADDRESS}</span>
            <a href={MAP} target="_blank" rel="noreferrer">
              Get Directions
            </a>
          </li>
          <li>
            <b>Call</b>
            {PHONES.map((entry) => (
              <a key={entry} href={`tel:+91${entry}`}>
                {entry}
              </a>
            ))}
          </li>
          <li>
            <b>Hours</b>
            <span>11:00 AM – 11:00 PM, every day. WhatsApp the order and we pack it from the counter.</span>
          </li>
        </ul>
        <form onSubmit={(event) => event.preventDefault()}>
          <p className="eyebrow">Write to us</p>
          <label>
            Name
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
          </label>
          <label>
            Phone
            <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Your number" inputMode="tel" />
          </label>
          <label>
            Message
            <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={4} placeholder="A booking, a question, a note for the kitchen" />
          </label>
          <a className="btn gold" href={whatsappUrl(text)} target="_blank" rel="noreferrer">
            Send on WhatsApp
          </a>
        </form>
      </div>
    </section>
  )
}
