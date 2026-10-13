const SQUARES = Array.from({ length: 64 }, (_, i) => ({
  x: (i % 8) * 50,
  y: Math.floor(i / 8) * 50,
  dark: ((i % 8) + Math.floor(i / 8)) % 2 === 1,
})).filter((s) => s.dark);

export function BoardArt() {
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label="Satranç tahtası üzerinde bir fincan kahve" className="board-art">
      <rect width="400" height="400" fill="var(--paper)" />
      <g fill="var(--accent)">
        {SQUARES.map((s) => (
          <rect key={`${s.x}-${s.y}`} x={s.x} y={s.y} width="50" height="50" />
        ))}
      </g>
      <ellipse cx="200" cy="318" rx="104" ry="18" fill="#231C17" opacity="0.35" />
      <path d="M120 190h160v62c0 40-34 70-80 70s-80-30-80-70z" fill="#231C17" />
      <path d="M280 208h22c20 0 20 44 0 44h-22" fill="none" stroke="#231C17" strokeWidth="14" />
      <ellipse cx="200" cy="190" rx="80" ry="12" fill="#6B4A33" />
      <path
        className="steam"
        d="M170 160c-14-18 14-26 0-48M205 160c-14-18 14-26 0-48M240 160c-14-18 14-26 0-48"
        fill="none"
        stroke="var(--paper)"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
