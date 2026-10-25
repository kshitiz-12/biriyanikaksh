import { ADDRESS, MENU, PHONES } from './menu.js'

export const SITE = 'https://www.biriyanikaksh.in'
export const IMAGE = `${SITE}/photos/hero-scene.png`

const LAT = 22.5368
const LONG = 85.8207

export function prettyPhone(digits) {
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
}

const phones = PHONES.map((digits) => `+91${digits}`)
const phoneText = PHONES.map(prettyPhone).join(' or ')

function inr(item) {
  return item.options.map((option) => `${option.label}${option.detail ? ` ${option.detail}` : ''} ₹${option.price}`).join(', ')
}

const biryani = MENU.find((group) => group.id === 'biryani')

export const FAQS = [
  {
    q: 'Where can I get biryani in Chaibasa?',
    a: `Biriyani Kaksh is at ${ADDRESS}, Jharkhand 833201. The counter cooks Hyderabadi chicken dum biryani, Kolkata chicken dum biryani and paneer Hyderabadi biryani, and it is open every day from 11:00 AM to 11:00 PM.`,
  },
  {
    q: 'What does biryani cost at Biriyani Kaksh?',
    a: biryani.items.map((item) => `${item.name}: ${inr(item)}.`).join(' '),
  },
  {
    q: 'How do I order biryani from Biriyani Kaksh?',
    a: `Choose a size on the menu and send the order on WhatsApp to ${prettyPhone(PHONES[0])}. You can also call ${phoneText}. The kitchen sees the message only after you press send in WhatsApp.`,
  },
  {
    q: 'What time is Biriyani Kaksh open?',
    a: 'Biriyani Kaksh is open every day from 11:00 AM to 11:00 PM, for dine-in and takeaway from the counter at Bodra Chowk, Tambo.',
  },
  {
    q: 'Is there a vegetarian biryani in Chaibasa?',
    a: 'Yes. Paneer Hyderabadi Biryani is on the board at Biriyani Kaksh, in mini, regular and large, from ₹130.',
  },
]

export const PAGES = {
  '/': {
    path: '/',
    title: 'Biriyani Kaksh | Dum Biryani in Chaibasa',
    description:
      'Dum biryani in Chaibasa at Biriyani Kaksh, Bodra Chowk, Tambo. Hyderabadi and Kolkata chicken dum, paneer biryani, thali and curry. Open 11 AM–11 PM.',
  },
  '/menu': {
    path: '/menu',
    title: 'Biryani Menu in Chaibasa | Biriyani Kaksh',
    description:
      'Biriyani Kaksh menu in Chaibasa. Chicken dum biryani from ₹110, Kolkata dum from ₹130, paneer biryani from ₹130, plus thali and curry. Mini, regular and large.',
  },
  '/contact': {
    path: '/contact',
    title: 'Biriyani Kaksh, Bodra Chowk, Chaibasa | Hours & Map',
    description:
      'Find Biriyani Kaksh at Bodra Chowk, Tambo, Chaibasa 833201. Open every day 11:00 AM to 11:00 PM. Call +91 87090 94928 or +91 62066 42623.',
  },
}

function pageUrl(path) {
  return path === '/' ? `${SITE}/` : `${SITE}${path}`
}

function menuItem(item) {
  return {
    '@type': 'MenuItem',
    name: item.name,
    description: item.blurb,
    image: `${SITE}${item.img}`,
    offers: item.options.map((option) => ({
      '@type': 'Offer',
      name: option.detail ? `${option.label} (${option.detail})` : option.label,
      price: String(option.price),
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    })),
  }
}

function restaurant() {
  return {
    '@type': 'Restaurant',
    '@id': `${SITE}/#restaurant`,
    name: 'Biriyani Kaksh',
    alternateName: ['Biryani Kaksh', 'Biriyani Kaksh Chaibasa', 'बिरयानी कक्ष'],
    description:
      'Biriyani Kaksh cooks dum biryani, thali and curry from one counter at Bodra Chowk, Tambo, Chaibasa.',
    url: `${SITE}/`,
    image: [IMAGE, `${SITE}/photos/reveal.png`, `${SITE}/logo.png`],
    telephone: phones[0],
    servesCuisine: ['Biryani', 'Hyderabadi', 'Kolkata', 'Indian'],
    priceRange: '₹₹',
    menu: `${SITE}/menu`,
    hasMenu: { '@id': `${SITE}/menu#menu` },
    acceptsReservations: false,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bodra Chowk, Tambo',
      addressLocality: 'Chaibasa',
      addressRegion: 'Jharkhand',
      postalCode: '833201',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: LAT,
      longitude: LONG,
    },
    hasMap: 'https://www.google.com/maps/search/?api=1&query=Bodra+Chowk+Tambo+Chaibasa',
    areaServed: {
      '@type': 'City',
      name: 'Chaibasa',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '11:00',
        closes: '23:00',
      },
    ],
    contactPoint: phones.map((telephone) => ({
      '@type': 'ContactPoint',
      telephone,
      contactType: 'reservations',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    })),
  }
}

function menuEntity() {
  return {
    '@type': 'Menu',
    '@id': `${SITE}/menu#menu`,
    name: 'Biriyani Kaksh menu',
    url: `${SITE}/menu`,
    inLanguage: 'en',
    hasMenuSection: MENU.map((group) => ({
      '@type': 'MenuSection',
      name: group.title,
      description: group.note,
      hasMenuItem: group.items.map(menuItem),
    })),
  }
}

function faqEntity() {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE}/#faq`,
    mainEntity: FAQS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

function crumbs(path, label) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: label, item: pageUrl(path) },
    ],
  }
}

export function graphFor(path) {
  if (path === '/menu') {
    return {
      '@context': 'https://schema.org',
      '@graph': [restaurant(), menuEntity(), crumbs('/menu', 'Menu')],
    }
  }
  if (path === '/contact') {
    return {
      '@context': 'https://schema.org',
      '@graph': [restaurant(), crumbs('/contact', 'Contact')],
    }
  }
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#website`,
        url: `${SITE}/`,
        name: 'Biriyani Kaksh',
        description: PAGES['/'].description,
        inLanguage: 'en',
        publisher: { '@id': `${SITE}/#restaurant` },
      },
      restaurant(),
      menuEntity(),
      faqEntity(),
    ],
  }
}

export function jsonLd(path) {
  return JSON.stringify(graphFor(path)).replace(/</g, '\\u003c')
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

export function fallbackHtml(path) {
  if (path === '/menu') {
    const items = MENU.flatMap((group) => group.items.map((item) => `<li><strong>${escapeHtml(item.name)}</strong> — ${escapeHtml(inr(item))}. ${escapeHtml(item.blurb)}</li>`)).join('')
    return `<main><h1>Biryani menu in Chaibasa</h1><p>Biriyani Kaksh at ${escapeHtml(ADDRESS)} cooks these plates to order. Open every day, 11:00 AM to 11:00 PM.</p><ul>${items}</ul><p><a href="/">Home</a> · <a href="/contact">Directions and phone</a></p></main>`
  }
  if (path === '/contact') {
    return `<main><h1>Biriyani Kaksh at Bodra Chowk, Chaibasa</h1><p>${escapeHtml(ADDRESS)}, Jharkhand 833201. Open every day from 11:00 AM to 11:00 PM. Call ${escapeHtml(phoneText)}. <a href="https://www.google.com/maps/search/?api=1&amp;query=Bodra+Chowk+Tambo+Chaibasa">Get directions</a>.</p><p><a href="/menu">See the menu</a></p></main>`
  }
  const faqs = FAQS.map((item) => `<dt>${escapeHtml(item.q)}</dt><dd>${escapeHtml(item.a)}</dd>`).join('')
  return `<main><h1>Biriyani Kaksh — dum biryani in Chaibasa</h1><p>Biriyani Kaksh cooks Hyderabadi and Kolkata dum biryani, paneer biryani, thali and curry at ${escapeHtml(ADDRESS)}, Jharkhand 833201. Open every day, 11:00 AM to 11:00 PM. Call ${escapeHtml(phoneText)}, or order on WhatsApp.</p><h2>Questions about biryani in Chaibasa</h2><dl>${faqs}</dl><p><a href="/menu">Menu and prices</a> · <a href="/contact">Address, hours and map</a></p></main>`
}

function setMeta(name, content, attr = 'name') {
  let node = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!node) {
    node = document.createElement('meta')
    node.setAttribute(attr, name)
    document.head.appendChild(node)
  }
  node.setAttribute('content', content)
}

export function llmsText() {
  const lines = [
    '# Biriyani Kaksh',
    '',
    '> Dum biryani counter at Bodra Chowk, Tambo, Chaibasa, Jharkhand.',
    '',
    'Biriyani Kaksh cooks Hyderabadi chicken dum biryani, Kolkata chicken dum biryani and paneer Hyderabadi biryani, plus thali and curry, from one counter. Open every day from 11:00 AM to 11:00 PM.',
    '',
    `- Website: ${SITE}/`,
    `- Menu: ${SITE}/menu`,
    `- Contact: ${SITE}/contact`,
    `- Address: ${ADDRESS}, Jharkhand 833201`,
    `- Phone: ${PHONES.map(prettyPhone).join(', ')}`,
    `- WhatsApp: ${prettyPhone(PHONES[0])}`,
    '- Map: https://www.google.com/maps/search/?api=1&query=Bodra+Chowk+Tambo+Chaibasa',
    '',
    '## Menu',
    '',
  ]
  for (const group of MENU) {
    lines.push(`### ${group.title}`, '', group.note, '')
    for (const item of group.items) {
      const prices = item.options.map((option) => `${option.label}${option.detail ? ` ${option.detail}` : ''} ₹${option.price}`).join(', ')
      lines.push(`- ${item.name}: ${prices}. ${item.blurb}`)
    }
    lines.push('')
  }
  lines.push('## Questions', '')
  for (const item of FAQS) {
    lines.push(`### ${item.q}`, '', item.a, '')
  }
  return `${lines.join('\n')}\n`
}

export function applySeo(pathname) {
  const page = PAGES[pathname] || PAGES['/']
  const url = pageUrl(page.path)
  document.title = page.title
  setMeta('description', page.description)
  setMeta('og:title', page.title, 'property')
  setMeta('og:description', page.description, 'property')
  setMeta('og:url', url, 'property')
  setMeta('twitter:title', page.title)
  setMeta('twitter:description', page.description)
  const canonical = document.head.querySelector('link[rel="canonical"]')
  if (canonical) canonical.setAttribute('href', url)
  let script = document.head.querySelector('script[data-bk="jsonld"]')
  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-bk', 'jsonld')
    document.head.appendChild(script)
  }
  script.textContent = jsonLd(page.path)
}
