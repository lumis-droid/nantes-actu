import Link from "next/link";
import { CATEGORIES } from "@/lib/articles";
import { LogoMark } from "./Logo";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <LogoMark size={36} />
          <div>
            <strong>Nantes Actu</strong>
            <p>L'information de Nantes et de sa métropole, chaque matin.</p>
          </div>
        </div>
        <ul className="footer__links">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link href={`/rubrique/${c.slug}`}>{c.name}</Link>
            </li>
          ))}
          <li>
            <Link href="/admin">Administration</Link>
          </li>
        </ul>
        <p className="footer__legal">
          © {new Date().getFullYear()} Nantes Actu — Site de démonstration. Les articles sont fictifs.
        </p>
      </div>
    </footer>
  );
}
