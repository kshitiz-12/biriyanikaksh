import { FAQS } from '../seo'

export default function Faq() {
  return (
    <section className="faq" id="faq">
      <p className="eyebrow">Chaibasa</p>
      <h2>Biryani at Bodra Chowk.</h2>
      <dl>
        {FAQS.map((item) => (
          <div key={item.q}>
            <dt>{item.q}</dt>
            <dd>{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
