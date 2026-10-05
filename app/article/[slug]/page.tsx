import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtVisual } from "@/components/ArtVisual";
import { ArticleCard } from "@/components/ArticleCard";
import { articlesByCategory, formatDate, getArticle, getCategory } from "@/lib/articles";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const article = getArticle((await params).slug);
  return { title: article?.title ?? "Article", description: article?.chapo };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const cat = getCategory(article.category);
  const related = articlesByCategory(article.category).filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div className="container">
      <article className="article">
        <header className="article__header">
          <Link href={`/rubrique/${article.category}`} className="kicker kicker--link">
            {cat?.name}
          </Link>
          <h1 className="article__title">{article.title}</h1>
          <p className="article__chapo">{article.chapo}</p>
          <p className="article__meta">
            Par <strong>{article.author}</strong> · Publié le {formatDate(article.date, true)} ·{" "}
            {article.readingTime} min de lecture
          </p>
        </header>
        <figure className="article__figure">
          <ArtVisual seed={article.slug} />
          <figcaption>Illustration Nantes Actu</figcaption>
        </figure>
        <div className="article__body">
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <section className="section">
          <h2 className="section-title">À lire aussi en {cat?.name}</h2>
          <div className="grid grid--3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
