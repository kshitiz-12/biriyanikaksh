const FRAMES = [
  ['/photos/hero-scene.png', 0],
  ['/photos/ingredients.png', 1],
  ['/photos/marinade.png', 2],
  ['/photos/layers.png', 3],
  ['/photos/dum.png', 4],
  ['/photos/reveal.png', 5],
]

const PLATES = ['/photos/thali.png', '/photos/curry.png', '/photos/reveal.png', '/photos/layers.png']

export default function Film() {
  return (
    <div className="film" aria-hidden="true">
      {FRAMES.map(([src, at]) => (
        <img key={src} src={src} alt="" style={{ '--at': at }} />
      ))}
      <div className="mosaic" style={{ '--at': 6 }}>
        {PLATES.map((src) => (
          <img key={src} src={src} alt="" />
        ))}
      </div>
    </div>
  )
}
