import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const env = fs.readFileSync(path.join(root, '.env'), 'utf8')
const key = env.match(/GEMINI_API_KEY=(.+)/)?.[1]?.trim()
if (!key) throw new Error('GEMINI_API_KEY missing')

const MODELS = ['gemini-3.1-flash-lite-image', 'gemini-nano-banana-2.1', 'gemini-2.5-flash-image']

const jobs = [
  {
    file: 'hero.png',
    aspect: '1:1',
    prompt:
      'Photoreal photograph of one ornate engraved copper biryani handi, three-quarter view, centered. The matching copper lid is lifted toward the upper right. The pot overflows with saffron chicken dum biryani, a roasted drumstick in the rice, mint, fried onions, and soft steam. Dark warm restaurant background, cinematic lighting, no text, no people, no logo.',
  },
  {
    file: 'ingredients.png',
    aspect: '4:3',
    prompt:
      'Same copper handi and dark warm lighting as the reference. The pot is empty and the lid leans open. Around it on a dark table: basmati rice, raw chicken, yogurt, saffron, whole spices, mint, and fried onions. Photoreal, no text, no people.',
  },
  {
    file: 'marinade.png',
    aspect: '4:3',
    prompt:
      'Same copper handi, same camera and dark lighting as the reference. The pot holds a thick reddish yogurt chicken marinade. The lid leans open to the upper right. Photoreal, no text, no people.',
  },
  {
    file: 'layers.png',
    aspect: '4:3',
    prompt:
      'Same copper handi, same camera and dark lighting as the reference. The pot is being layered with saffron rice, chicken, fried onions and mint, not fully finished. Lid open to the upper right. Photoreal, no text, no people.',
  },
  {
    file: 'dum.png',
    aspect: '4:3',
    prompt:
      'Same copper handi, same camera and dark lighting as the reference. The lid is fully closed and seated. A small gas flame burns under the pot and a little steam escapes the rim. Photoreal, no text, no people.',
  },
  {
    file: 'reveal.png',
    aspect: '4:3',
    prompt:
      'Same copper handi, same camera and dark lighting as the reference. Lid lifted to the upper right. Steaming saffron chicken dum biryani with a drumstick, mint and fried onions. Photoreal, no text, no people.',
  },
  {
    file: 'thali.png',
    aspect: '4:3',
    prompt:
      'Photoreal Indian thali on a dark table, copper bowls of curry, rice, roti and salad, warm cinematic light, no text, no people, no logo.',
  },
  {
    file: 'hero-scene.png',
    aspect: '16:9',
    prompt:
      'Recreate only the food photograph from the reference, as a wide cinematic restaurant scene. Ornate engraved copper biryani handi sits on the RIGHT, lid lifted toward the top right, overflowing saffron chicken dum biryani with a roasted drumstick, flying star anise, onion rings, cardamom, mint and steam. Dark carved wood and warm lanterns behind it. Fried onions in a bowl at the bottom right, spices scattered on the table. The LEFT side of the frame is dark and uncluttered. Photoreal, no text, no letters, no logo, no buttons, no menu, no watermark.',
  },
  {
    file: 'curry.png',
    aspect: '4:3',
    prompt:
      'Photoreal chicken masala curry in a small copper bowl, dark warm background, steam, no text, no people, no logo.',
  },
]

async function generate(job, ref) {
  const parts = []
  if (ref) {
    const mime = ref.endsWith('.png') ? 'image/png' : 'image/jpeg'
    parts.push({
      inline_data: {
        mime_type: mime,
        data: fs.readFileSync(ref).toString('base64'),
      },
    })
  }
  parts.push({ text: job.prompt })
  let last = 'no model worked'
  for (const model of MODELS) {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          responseModalities: ['TEXT', 'IMAGE'],
          imageConfig: { aspectRatio: job.aspect },
        },
      }),
    })
    const json = await res.json()
    if (!res.ok) {
      const msg = json.error?.message || res.statusText
      last = `${model} ${res.status}: ${msg}`
      if (res.status === 404 || /not found|not supported/i.test(msg)) continue
      throw new Error(last)
    }
    const part = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData || p.inline_data)
    const data = part?.inlineData?.data || part?.inline_data?.data
    if (!data) throw new Error(`${model} returned no image`)
    const out = path.join(root, 'public', 'photos', job.file)
    fs.mkdirSync(path.dirname(out), { recursive: true })
    fs.writeFileSync(out, Buffer.from(data, 'base64'))
    console.log('saved', job.file, model)
    return out
  }
  throw new Error(last)
}

const only = process.argv[2]
const list = only ? jobs.filter((job) => job.file === only) : jobs
const mockup = 'C:/Users/adity/.cursor/projects/c-Users-adity-OneDrive-Desktop-portfolio-web/assets/image-f7132944-dc48-4fb2-843f-9f066419735b.jpg'
let ref = path.join(root, 'public', 'photos', 'hero.png')
for (const job of list) {
  if (job.file === 'hero-scene.png') {
    await generate(job, mockup)
    continue
  }
  const useRef = job.file !== 'hero.png' && job.file !== 'thali.png' && job.file !== 'curry.png' && fs.existsSync(ref)
  await generate(job, useRef ? ref : null)
}
