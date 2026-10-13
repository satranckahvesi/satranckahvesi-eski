import Link from "next/link";
import { NAV, SITE } from "@/lib/content";
import { LogoMark } from "./Logo";

export function Header() {
  return (
    <header className="container masthead">
      <Link href="/" className="brand display">
        <LogoMark />
        {SITE.name}
      </Link>
      <nav aria-label="Ana menü" className="nav">
        {NAV.map((item) => (
          <a key={item.label} href={item.href}>{item.label}</a>
        ))}
      </nav>
    </header>
  );
}
