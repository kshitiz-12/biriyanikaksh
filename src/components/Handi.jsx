import { useId } from 'react'

const GRAINS = [
  [168, 268, 18, 7, -20, '#f3e2b0'],
  [196, 274, 20, 8, 12, '#e7c56a'],
  [228, 270, 16, 6, -8, '#fff6d8'],
  [252, 262, 18, 7, 18, '#d9a44a'],
  [150, 252, 16, 6, 8, '#f0d48a'],
  [178, 248, 22, 8, -14, '#fff1c9'],
  [210, 244, 20, 7, 6, '#e8b85a'],
  [240, 250, 18, 7, -16, '#f7e7bc'],
  [264, 246, 14, 5, 10, '#c9843a'],
  [160, 234, 15, 6, 4, '#fff8e4'],
  [188, 228, 18, 6, -10, '#f0d48a'],
  [214, 226, 16, 6, 14, '#e2b15a'],
  [238, 232, 17, 6, -6, '#fff6d8'],
  [200, 258, 12, 5, 20, '#a8622a'],
  [230, 256, 11, 5, -18, '#8d4e22'],
]

export default function Handi() {
  const raw = useId().replace(/:/g, '')
  const clip = `pot-${raw}`
  return (
    <svg className="handi" viewBox="0 0 420 500" aria-hidden="true">
      <defs>
        <radialGradient id={`${raw}-copper`} cx="32%" cy="28%" r="75%">
          <stop offset="0" stopColor="#ffe3b0" />
          <stop offset="0.18" stopColor="#e7b56a" />
          <stop offset="0.45" stopColor="#c47a3a" />
          <stop offset="0.48" stopColor="#a15a28" />
          <stop offset="0.72" stopColor="#6e3418" />
          <stop offset="1" stopColor="#3d1c0d" />
        </radialGradient>
        <radialGradient id={`${raw}-lid`} cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor="#ffe7c2" />
          <stop offset="0.35" stopColor="#d39a52" />
          <stop offset="0.7" stopColor="#8a4b24" />
          <stop offset="1" stopColor="#4a2412" />
        </radialGradient>
        <linearGradient id={`${raw}-rim`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f8e2bc" />
          <stop offset="0.45" stopColor="#c47a3a" />
          <stop offset="1" stopColor="#5c2c14" />
        </linearGradient>
        <radialGradient id={`${raw}-well`} cx="50%" cy="40%" r="65%">
          <stop offset="0" stopColor="#4a2416" />
          <stop offset="1" stopColor="#140804" />
        </radialGradient>
        <filter id={`${raw}-grain`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.18" />
          </feComponentTransfer>
        </filter>
        <clipPath id={clip}>
          <ellipse cx="210" cy="228" rx="92" ry="28" />
        </clipPath>
      </defs>

      <ellipse className="h-shadow" cx="210" cy="448" rx="130" ry="18" />

      <g className="h-flame">
        <path d="M186 400c6 22 16 36 24 36s18-14 24-36c-10 10-16 12-24 8-8 4-14 2-24-8z" />
        <path d="M198 404c4 16 10 24 12 24s8-8 12-24c-6 6-8 8-12 4-4 4-6 2-12-4z" />
      </g>

      <g className="h-spices">
        <g transform="translate(70 150) rotate(-28)">
          <ellipse cx="0" cy="0" rx="16" ry="7" />
          <path d="M-8 0h16" />
        </g>
        <g transform="translate(338 132) rotate(20)">
          <ellipse cx="0" cy="0" rx="13" ry="6" />
          <path d="M-6 0h12" />
        </g>
        <path d="M58 214c10-2 16 6 8 12-6-4-10-6-8-12z" />
        <path d="M348 196c12 0 14 10 4 14-6-2-10-8-4-14z" />
        <path d="M96 96c2 10 12 14 16 8-8 2-16-2-16-8z" />
        <circle cx="352" cy="230" r="4" />
        <circle cx="86" cy="210" r="3.5" />
      </g>

      <g className="h-pot">
        <path
          className="h-body"
          fill={`url(#${raw}-copper)`}
          d="M118 214c-6 28-14 70-8 112 6 48 46 78 100 84 54-6 94-36 100-84 6-42-2-84-8-112-18 16-46 26-92 26s-74-10-92-26z"
        />
        <ellipse className="h-sheen" cx="168" cy="280" rx="36" ry="70" />
        <path className="h-engrave" d="M132 268c22 8 46 12 78 8M128 304c28 12 62 16 104 4M140 340c24 8 52 10 86 2" />
        <path className="h-engrave fine" d="M150 286h70M146 322h92" />
        <path className="h-handle left" d="M112 268c-26 2-38 18-34 32 10-2 22-8 34-14" />
        <path className="h-handle right" d="M308 268c26 2 38 18 34 32-10-2-22-8-34-14" />
        <ellipse cx="210" cy="214" rx="104" ry="30" fill={`url(#${raw}-rim)`} />
        <ellipse className="h-well" cx="210" cy="220" rx="86" ry="22" fill={`url(#${raw}-well)`} />

        <g clipPath={`url(#${clip})`}>
          <ellipse className="h-marinade" cx="210" cy="236" rx="84" ry="24" />
          <ellipse className="h-layer a" cx="210" cy="232" rx="82" ry="18" />
          <ellipse className="h-layer b" cx="210" cy="224" rx="78" ry="14" />
          <g className="h-rice">
            {GRAINS.map(([x, y, rx, ry, rot, fill], i) => (
              <ellipse key={i} cx={x} cy={y - 16} rx={rx * 0.72} ry={ry} transform={`rotate(${rot} ${x} ${y - 16})`} fill={fill} />
            ))}
          </g>
          <g className="h-leg">
            <path d="M214 214c6-16 10-34 8-52 8 2 16 10 16 20 0 16-8 28-16 36-4 8-8 6-8-4z" />
            <path d="M228 168c6-8 16-10 18-4 2 6-4 12-12 14-6 1-8-4-6-10z" />
          </g>
          <path className="h-mint" d="M168 214c8-10 18-8 16 2-6 2-12 2-16-2z" />
          <path className="h-mint b" d="M186 208c6-8 14-6 12 2-6 2-10 2-12-2z" />
        </g>

        <ellipse cx="210" cy="208" rx="104" ry="30" fill="none" stroke="#f6e2c4" strokeWidth="2.5" opacity="0.85" />
        <ellipse cx="210" cy="214" rx="86" ry="20" fill="none" stroke="rgba(40,16,8,0.55)" strokeWidth="3" />
      </g>

      <g className="h-lid">
        <path fill={`url(#${raw}-lid)`} d="M118 196c8-62 40-98 92-98s84 36 92 98c-28 16-58 24-92 24s-64-8-92-24z" />
        <ellipse cx="168" cy="150" rx="28" ry="16" className="h-sheen" />
        <ellipse cx="210" cy="198" rx="96" ry="14" fill="#f3d7a8" />
        <ellipse cx="210" cy="202" rx="96" ry="10" fill="#8a4e28" opacity="0.35" />
        <rect x="206" y="118" width="8" height="22" rx="3" fill="#e7c48a" />
        <circle cx="210" cy="112" r="11" fill="#f6e2c4" />
        <circle cx="206" cy="108" r="3.5" fill="#fff" opacity="0.7" />
      </g>

      <g className="h-steam">
        <ellipse cx="176" cy="150" rx="14" ry="26" />
        <ellipse cx="210" cy="124" rx="16" ry="32" />
        <ellipse cx="246" cy="146" rx="12" ry="24" />
      </g>
    </svg>
  )
}
