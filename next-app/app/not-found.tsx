import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container" style={{ padding: "96px 24px" }}>
      <h1 className="display" style={{ fontSize: "3rem" }}>Sayfa bulunamadı</h1>
      <p style={{ margin: "16px 0 32px" }}>Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.</p>
      <Link className="btn btn-dark" href="/">Ana sayfaya dön</Link>
    </main>
  );
}
