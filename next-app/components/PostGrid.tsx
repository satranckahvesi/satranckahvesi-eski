import { POSTS, SITE, postUrl } from "@/lib/content";

export function PostGrid() {
  return (
    <section id="yazilar" className="container posts" aria-labelledby="yazilar-title">
      <div className="section-head">
        <h2 id="yazilar-title" className="display section-title">Son yazılar</h2>
        <a className="more" href={`${SITE.url}/yazilar/`}>Arşivin tamamı →</a>
      </div>
      <ul className="post-grid">
        {POSTS.map((p) => (
          <li key={p.slug}>
            <article className="card">
              <p className="eyebrow">{p.column}</p>
              <h3 className="display card-title">
                <a href={postUrl(p.slug)}>{p.title}</a>
              </h3>
              <p className="byline">{p.author}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
