// Decorative homepage hero backdrop: layered Sierra-foothill pine ridges at
// dusk. Pure inline SVG (no network request, sharp at any DPR). Everything is
// computed at module load from a fixed seed, so server and client render the
// exact same markup.

const W = 1600
const H = 900

// mulberry32: tiny deterministic PRNG so tree placement is stable across builds
function rng(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const r1 = (n: number) => Math.round(n * 10) / 10

type Wave = [amplitude: number, frequency: number, phase: number]

function ridgeY(x: number, base: number, waves: Wave[]) {
  return waves.reduce((y, [a, f, p]) => y + a * Math.sin(x * f + p), base)
}

function ridgePath(base: number, waves: Wave[]) {
  let d = `M0 ${H}`
  for (let x = 0; x <= W; x += 20) d += ` L${x} ${r1(ridgeY(x, base, waves))}`
  return `${d} L${W} ${H} Z`
}

type Tree = { x: number; y: number; w: number; h: number }

function treeRow(
  seed: number,
  base: number,
  waves: Wave[],
  spacing: number,
  [minH, maxH]: [number, number],
  edgeBoost: number
): Tree[] {
  const rand = rng(seed)
  const trees: Tree[] = []
  for (let x = -20; x < W + 20; x += spacing * (0.6 + rand() * 0.8)) {
    // Taller toward the edges so the middle, behind the copy, stays calm
    const edge = 1 + edgeBoost * Math.abs(x - W / 2) / (W / 2)
    const h = (minH + rand() * (maxH - minH)) * edge
    const w = h * (0.34 + rand() * 0.12)
    // Bury most of the trunk behind the ridge fill, or rows read as fence posts
    const ground = ridgeY(x, base, waves) + h * 0.24
    trees.push({ x: r1(x - w / 2), y: r1(ground - h), w: r1(w), h: r1(h) })
  }
  return trees
}

const FAR_WAVES: Wave[] = [[55, 0.0021, 0.8], [28, 0.0057, 2.1], [10, 0.013, 0.4]]
const MID_WAVES: Wave[] = [[34, 0.0029, 2.6], [16, 0.0083, 1.2]]
const NEAR_WAVES: Wave[] = [[22, 0.0037, 4.1], [9, 0.011, 0.3]]

const FAR_BASE = 540
const MID_BASE = 680
const NEAR_BASE = 820

const FAR_RIDGE = ridgePath(FAR_BASE, FAR_WAVES)
const MID_RIDGE = ridgePath(MID_BASE, MID_WAVES)
const NEAR_RIDGE = ridgePath(NEAR_BASE, NEAR_WAVES)

const MID_TREES = treeRow(7, MID_BASE, MID_WAVES, 22, [26, 100], 0.3)
const NEAR_TREES = treeRow(23, NEAR_BASE, NEAR_WAVES, 30, [110, 210], 0.8)

const STARS = (() => {
  const rand = rng(91)
  return Array.from({ length: 46 }, () => ({
    cx: r1(rand() * W),
    cy: r1(60 + rand() * 380),
    r: r1(0.6 + rand() * 1.1),
    o: r1(0.15 + rand() * 0.45)
  }))
})()

function Trees({ trees, fill }: { trees: Tree[]; fill: string }) {
  return (
    <g fill={fill}>
      {trees.map((t, i) => (
        <use key={i} href="#hero-pine" x={t.x} y={t.y} width={t.w} height={t.h} />
      ))}
    </g>
  )
}

export default function HeroBackdrop({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1a20" />
          <stop offset="0.55" stopColor="#1d2622" />
          <stop offset="0.8" stopColor="#24372b" />
          <stop offset="1" stopColor="#14201a" />
        </linearGradient>
        <radialGradient id="hero-glow" cx="0.74" cy="0.6" r="0.5">
          <stop offset="0" stopColor="#f59e0b" stopOpacity="0.42" />
          <stop offset="0.35" stopColor="#d97706" stopOpacity="0.16" />
          <stop offset="1" stopColor="#d97706" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hero-mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a3ada3" stopOpacity="0" />
          <stop offset="0.5" stopColor="#a3ada3" stopOpacity="0.1" />
          <stop offset="1" stopColor="#a3ada3" stopOpacity="0" />
        </linearGradient>
        {/* Stacked-tier conifer; stretched freely per tree via <use> width/height */}
        <symbol id="hero-pine" viewBox="0 0 40 100" preserveAspectRatio="none">
          <path d="M20 0 L27 20 L23.5 20 L32 42 L27 42 L37 70 L22.5 70 L22.5 100 L17.5 100 L17.5 70 L3 70 L13 42 L8 42 L16.5 20 L13 20 Z" />
        </symbol>
      </defs>

      <rect width={W} height={H} fill="url(#hero-sky)" />
      <rect width={W} height={H} fill="url(#hero-glow)" />

      <g fill="#e0e0e2">
        {STARS.map((s, i) => (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} opacity={s.o} />
        ))}
      </g>

      <path d={FAR_RIDGE} fill="#4d594d" opacity="0.7" />
      <rect y={FAR_BASE - 40} width={W} height={200} fill="url(#hero-mist)" />

      <Trees trees={MID_TREES} fill="#2a342e" />
      <path d={MID_RIDGE} fill="#2a342e" />

      <Trees trees={NEAR_TREES} fill="#121614" />
      <path d={NEAR_RIDGE} fill="#121614" />
    </svg>
  )
}
