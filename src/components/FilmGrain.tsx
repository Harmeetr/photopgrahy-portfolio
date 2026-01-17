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
          {/* Add warm sepia tint */}
          <feColorMatrix
            type="matrix"
            values="1.1 0.1 0 0 0.03
            0.05 1 0.05 0 0.02
            0 0.1 0.9 0 0
            0 0 0 1 0"
          />
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
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(15,13,10,0.25) 100%)',
        }}
      />
    </div>
  )
}
