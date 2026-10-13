import { COLUMNS } from "@/lib/content";

export function ColumnNav() {
  return (
    <section id="koseler" className="container columns" aria-labelledby="koseler-title">
      <h2 id="koseler-title" className="display columns-title">Köşeler</h2>
      <ul className="chips">
        {COLUMNS.map((c) => (
          <li key={c.name}>
            <a className="chip" href={c.href}>{c.name}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
