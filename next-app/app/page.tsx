import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ColumnNav } from "@/components/ColumnNav";
import { PostGrid } from "@/components/PostGrid";
import { StartCard } from "@/components/StartCard";
import { AuthorList } from "@/components/AuthorList";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  inLanguage: "tr",
  description: SITE.tagline,
};

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#icerik">İçeriğe geç</a>
      <Header />
      <main id="icerik">
        <Hero />
        <ColumnNav />
        <PostGrid />
        <div className="container split">
          <StartCard />
          <AuthorList />
        </div>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
