import { SITE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="display footer-brand">{SITE.name}</p>
          <p className="footer-tag">{SITE.tagline}</p>
        </div>
        <nav aria-label="Alt menü" className="footer-nav">
          <a href={`${SITE.url}/hakkinda/`}>Hakkında</a>
          <a href={`${SITE.url}/gizlilik/`}>Gizlilik</a>
        </nav>
      </div>
    </footer>
  );
}
