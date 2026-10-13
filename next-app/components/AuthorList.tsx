import { AUTHORS } from "@/lib/content";

export function AuthorList() {
  return (
    <section id="yazarlar" className="authors" aria-labelledby="yazarlar-title">
      <h2 id="yazarlar-title" className="display authors-title">Masadakiler</h2>
      <ul>
        {AUTHORS.map((a) => (
          <li key={a.name}>
            <a href="https://satranckahvesi.com/yazarlar/">
              <span>{a.name}</span>
              <span className="note">{a.note}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
