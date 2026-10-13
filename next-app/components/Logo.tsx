export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <rect x="17" y="1" width="16" height="16" fill="var(--accent)" />
      <rect x="1" y="17" width="16" height="16" fill="var(--accent)" />
    </svg>
  );
}
