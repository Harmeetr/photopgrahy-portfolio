'use client'

export default function FilmGrain() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* SVG noise filter */}
      <svg className="hidden">
        <filter id="film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          filter: 'url(#film-grain)',
          transform: 'scale(1.2)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.15) 100%)',
        }}
      />
    </div>
  )
}
