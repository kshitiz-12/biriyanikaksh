export const PHONES = ['8709094928', '6206642623']
export const WHATSAPP = '918709094928'
export const ADDRESS = 'Bodra Chowk, Tambo, Chaibasa'

export const STEPS = [
  {
    n: '01',
    title: 'Ingredients',
    text: 'Aged basmati, saffron, whole spices, mint and the day’s chicken, mutton or paneer. Nothing goes in until it is weighed.',
  },
  {
    n: '02',
    title: 'Marination',
    text: 'Yogurt, ginger, garlic and chilli sit with the meat so the dum carries flavour, not just heat.',
  },
  {
    n: '03',
    title: 'Layering',
    text: 'Rice, masala, fried onion and ghee are laid by hand. Each layer is where the grain takes the spice.',
  },
  {
    n: '04',
    title: 'Dum Cooking',
    text: 'The handi is sealed. A low flame finishes the rice without a single stir.',
  },
  {
    n: '05',
    title: 'The Reveal',
    text: 'The seal breaks, steam lifts, and the biryani is served straight from the pot.',
  },
]

const size = (id, label, detail, price) => ({ id, label, detail, price })

export const MENU = [
  {
    id: 'biryani',
    title: 'Biryani',
    note: 'Mini 1 pc · Regular 2 pcs · Large 3 pcs',
    items: [
      {
        id: 'hyd-chicken',
        name: 'Hyd. Chicken Dum Biryani',
        img: '/photos/reveal.png',
        blurb: 'Hyderabadi dum, saffron rice and a slow seal.',
        options: [size('mini', 'Mini', '1 pc', 110), size('regular', 'Regular', '2 pcs', 175), size('large', 'Large', '3 pcs', 260)],
      },
      {
        id: 'kol-chicken',
        name: 'Kol. Chicken Dum Biryani',
        img: '/photos/layers.png',
        blurb: 'Kolkata dum with a lighter gravy and potato.',
        options: [size('mini', 'Mini', '1 pc', 130), size('regular', 'Regular', '2 pcs', 195), size('large', 'Large', '3 pcs', 280)],
      },
      {
        id: 'paneer',
        name: 'Paneer Hyderabadi Biryani',
        img: '/photos/hero-scene.png',
        blurb: 'The same dum, finished with paneer.',
        options: [size('mini', 'Mini', '1 pc', 130), size('regular', 'Regular', '2 pcs', 195), size('large', 'Large', '3 pcs', 280)],
      },
    ],
  },
  {
    id: 'thali',
    title: 'Thali',
    note: 'Served with the day’s sides',
    items: [
      { id: 'chicken-thali', name: 'Chicken Thali', img: '/photos/thali.png', blurb: 'Chicken, rice, salad and the day’s sides.', options: [size('one', 'Plate', '', 150)] },
      { id: 'mutton-thali', name: 'Mutton Thali', img: '/photos/thali.png', blurb: 'Mutton plate with rice and sides.', options: [size('one', 'Plate', '', 200)] },
      { id: 'egg-thali', name: 'Egg Thali', img: '/photos/thali.png', blurb: 'Egg curry, rice and the counter sides.', options: [size('one', 'Plate', '', 110)] },
      { id: 'fish-thali', name: 'Fish Thali', img: '/photos/thali.png', blurb: 'Fish plate, rice and salad.', options: [size('one', 'Plate', '', 150)] },
      { id: 'veg-thali', name: 'Veg Thali', img: '/photos/thali.png', blurb: 'Seasonal vegetables, rice and roti.', options: [size('one', 'Plate', '', 80)] },
      { id: 'thali-roti', name: 'Roti', img: '/photos/ingredients.png', blurb: 'One fresh roti from the tawa.', options: [size('one', 'Piece', '', 10)] },
    ],
  },
  {
    id: 'curry',
    title: 'Curry',
    note: 'Half / full, where two prices are listed',
    items: [
      {
        id: 'chicken-masala',
        name: 'Chicken Masala',
        img: '/photos/curry.png',
        blurb: 'Chicken in a masala gravy.',
        options: [size('half', 'Half', '', 120), size('full', 'Full', '', 180)],
      },
      {
        id: 'mutton-curry',
        name: 'Mutton Curry',
        img: '/photos/curry.png',
        blurb: 'Slow mutton curry, half or full.',
        options: [size('half', 'Half', '', 180), size('full', 'Full', '', 300)],
      },
      {
        id: 'fish-curry',
        name: 'Fish Curry',
        img: '/photos/curry.png',
        blurb: 'Fish simmered in the day’s gravy.',
        options: [size('half', 'Half', '', 150), size('full', 'Full', '', 200)],
      },
      {
        id: 'egg-curry',
        name: 'Egg Curry',
        img: '/photos/curry.png',
        blurb: 'Egg curry, half or full.',
        options: [size('half', 'Half', '', 80), size('full', 'Full', '', 120)],
      },
      { id: 'curry-roti', name: 'Roti', img: '/photos/ingredients.png', blurb: 'One fresh roti beside the curry.', options: [size('one', 'Piece', '', 10)] },
      {
        id: 'mutton-pachoni',
        name: 'Mutton Pachoni Masala',
        img: '/photos/curry.png',
        blurb: 'Mutton pachoni, the Kaksh gravy.',
        options: [size('half', 'Half', '', 150), size('full', 'Full', '', 200)],
      },
    ],
  },
  {
    id: 'extras',
    title: 'Extras',
    note: 'Add beside the dum',
    items: [
      { id: 'extra-chicken', name: 'Chicken', img: '/photos/reveal.png', blurb: 'An extra portion of chicken.', options: [size('one', 'Portion', '', 45)] },
      { id: 'extra-egg', name: 'Egg', img: '/photos/ingredients.png', blurb: 'One boiled egg on the side.', options: [size('one', 'Piece', '', 20)] },
      { id: 'cold-drink', name: 'Masala Cold Drink', img: '/photos/ingredients.png', blurb: 'A chilled masala glass.', options: [size('one', 'Glass', '', 35)] },
      { id: 'chai', name: 'Chai', img: '/photos/dum.png', blurb: 'A cup from the counter.', options: [size('one', 'Cup', '', 20)] },
      { id: 'coffee', name: 'Coffee', img: '/photos/dum.png', blurb: 'A hot cup with the meal.', options: [size('one', 'Cup', '', 30)] },
    ],
  },
]

export function lineKey(itemId, optionId) {
  return `${itemId}:${optionId}`
}

export function orderText(lines, name, note) {
  const rows = lines.map((line, i) => {
    const sizeLabel = line.optionLabel && line.optionLabel !== 'Plate' && line.optionLabel !== 'Piece' && line.optionLabel !== 'Portion' && line.optionLabel !== 'Glass' && line.optionLabel !== 'Cup'
      ? ` (${line.optionLabel}${line.detail ? ` · ${line.detail}` : ''})`
      : ''
    return `${i + 1}. ${line.name}${sizeLabel} × ${line.qty} — ₹${line.price * line.qty}`
  })
  const total = lines.reduce((sum, line) => sum + line.price * line.qty, 0)
  const qty = lines.reduce((sum, line) => sum + line.qty, 0)
  return [
    'Biriyani Kaksh — order',
    name.trim() ? `Name: ${name.trim()}` : null,
    '',
    ...rows,
    '',
    `Items: ${qty}`,
    `Total: ₹${total}`,
    note.trim() ? `Note: ${note.trim()}` : null,
    '',
    ADDRESS,
  ]
    .filter((row) => row !== null)
    .join('\n')
}

export function whatsappUrl(text) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`
}
