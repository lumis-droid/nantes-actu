import Link from "next/link";

export function LogoMark({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Nantes Actu"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="64" height="64" rx="14" fill="var(--accent)" />
      <path d="M17 42V15h6.5l16 19.5V15H46v27h-6.5l-16-19.5V42z" fill="#fff" />
      <path
        d="M11 51c5.2-3.6 9.3-3.6 14 0s9.3 3.6 14 0 9.3-3.6 14 0"
        fill="none"
        stroke="#fff"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className={compact ? "logo logo--compact" : "logo"} aria-label="Nantes Actu, retour à la une">
      <LogoMark size={compact ? 34 : 56} />
      <span className="logo__word">
        <span className="logo__name">
          Nantes<span className="logo__accent">Actu</span>
        </span>
        {!compact && <span className="logo__tagline">Le journal de la métropole</span>}
      </span>
    </Link>
  );
}
