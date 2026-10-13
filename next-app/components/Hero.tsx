import { FEATURED, postUrl } from "@/lib/content";
import { BoardArt } from "./BoardArt";

export function Hero() {
  const href = postUrl(FEATURED.slug);
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-light">{FEATURED.column} · {FEATURED.author}</p>
          <h1 id="hero-title" className="display hero-title">
            <a href={href}>{FEATURED.title}</a>
          </h1>
          <p className="hero-excerpt">{FEATURED.excerpt}</p>
          <div className="hero-actions">
            <a className="btn btn-mint" href={href}>Yazıyı oku</a>
            <a className="link-underline" href="#yazilar">Tüm yazılar</a>
          </div>
        </div>
        <div className="hero-art">
          <BoardArt />
        </div>
      </div>
    </section>
  );
}
