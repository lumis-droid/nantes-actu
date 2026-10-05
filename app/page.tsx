import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { CATEGORIES, articlesByCategory, latestArticles, mostRead } from "@/lib/articles";

export default function Home() {
  const all = latestArticles();
  const hero = all.find((a) => a.featured) ?? all[0];
  const rest = all.filter((a) => a.slug !== hero.slug);
  const secondary = rest.slice(0, 3);
  const grid = rest.slice(3, 9);
  const top = mostRead(5);

  return (
    <div className="container">
      <section className="une">
        <div className="une__hero">
          <ArticleCard article={hero} variant="hero" />
        </div>
        <div className="une__side">
          {secondary.map((a) => (
            <ArticleCard key={a.slug} article={a} variant="compact" />
          ))}
        </div>
        <aside className="une__rank">
          <h2 className="section-title">Les plus lus</h2>
          <ol className="rank">
            {top.map((a, i) => (
              <li key={a.slug} className="rank__item">
                <span className="rank__num">{i + 1}</span>
                <Link href={`/article/${a.slug}`}>{a.title}</Link>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section className="section">
        <h2 className="section-title">Dernières actualités</h2>
        <div className="grid grid--3">
          {grid.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {CATEGORIES.map((cat) => {
        const items = articlesByCategory(cat.slug).slice(0, 3);
        if (!items.length) return null;
        return (
          <section className="section" key={cat.slug}>
            <h2 className="section-title">
              <Link href={`/rubrique/${cat.slug}`}>{cat.name}</Link>
              <span className="section-title__more">
                <Link href={`/rubrique/${cat.slug}`}>Toute la rubrique →</Link>
              </span>
            </h2>
            <div className="grid grid--3">
              {items.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
