import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleImage } from "@/components/ArticleImage";
import { Paywall } from "@/components/Paywall";
import { ShareBox } from "@/components/ShareBox";
import {
  articlePath,
  articlesByCategory,
  formatDate,
  getArticle,
  getArticleById,
  getCategory,
  parseArticleParam,
} from "@/lib/articles";

type Params = Promise<{ slug: string }>;

function resolve(param: string) {
  const { slug, id } = parseArticleParam(param);
  // L'identifiant en fin de lien fait foi ; l'ancien format /article/<slug> reste accepté.
  return id !== null ? getArticleById(id) : getArticle(slug);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const article = resolve((await params).slug);
  return { title: article?.title ?? "Article", description: article?.chapo };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug: param } = await params;
  const article = resolve(param);
  if (!article) notFound();
  const canonical = articlePath(article);
  if (`/article/${param}` !== canonical) redirect(canonical);

  const session = await auth();
  const locked = !session?.user;
  const cat = getCategory(article.category);
  const related = articlesByCategory(article.category).filter((a) => a.id !== article.id).slice(0, 3);

  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const shareUrl = `${proto}://${host}${canonical}`;

  // Quand l'article est verrouillé, seul le premier paragraphe est envoyé au navigateur.
  const paragraphs = locked ? article.body.slice(0, 1) : article.body;

  return (
    <div className="container">
      <article className={`article ${locked ? "article--locked" : ""}`}>
        <header className="article__header">
          <Link href={`/rubrique/${article.category}`} className="kicker kicker--link">
            {cat?.name}
          </Link>
          <h1 className="article__title">{article.title}</h1>
          <p className="article__chapo">{article.chapo}</p>
          <p className="article__meta">
            Par <strong>{article.author}</strong> · Publié le {formatDate(article.date, true)} ·{" "}
            {article.readingTime} min de lecture · N° {article.id}
          </p>
        </header>
        <figure className="article__figure">
          <ArticleImage image={article.image} alt={article.image.caption} eager />
          <figcaption>
            {article.image.caption} <span className="credit">Photo : {article.image.credit}</span>
          </figcaption>
        </figure>
        <div className="article__body">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {locked && <div className="article__fade" aria-hidden="true" />}
        </div>
        {!locked && <ShareBox url={shareUrl} />}
      </article>

      {locked && <Paywall redirectTo={canonical} />}

      {!locked && related.length > 0 && (
        <section className="section">
          <h2 className="section-title">À lire aussi en {cat?.name}</h2>
          <div className="grid grid--3">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
