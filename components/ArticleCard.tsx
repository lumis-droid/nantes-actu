import Link from "next/link";
import { type Article, articlePath, formatDate, getCategory } from "@/lib/articles";
import { ArticleImage } from "./ArticleImage";

type Props = {
  article: Article;
  variant?: "hero" | "standard" | "compact" | "list";
};

export function ArticleCard({ article, variant = "standard" }: Props) {
  const cat = getCategory(article.category);
  const href = articlePath(article);

  if (variant === "hero") {
    return (
      <article className="card card--hero">
        <Link href={href} className="card__visual">
          <ArticleImage image={article.image} alt={article.image.caption} eager />
        </Link>
        <div className="card__body">
          <span className="kicker">{cat?.name}</span>
          <h2 className="card__title card__title--hero">
            <Link href={href}>{article.title}</Link>
          </h2>
          <p className="card__chapo">{article.chapo}</p>
          <p className="card__meta">
            Par {article.author} · {formatDate(article.date)} · {article.readingTime} min
          </p>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="card card--compact">
        <div className="card__body">
          <span className="kicker">{cat?.name}</span>
          <h3 className="card__title card__title--compact">
            <Link href={href}>{article.title}</Link>
          </h3>
          <p className="card__meta">{article.readingTime} min</p>
        </div>
      </article>
    );
  }

  if (variant === "list") {
    return (
      <article className="card card--list">
        <Link href={href} className="card__visual">
          <ArticleImage image={article.image} alt={article.image.caption} />
        </Link>
        <div className="card__body">
          <span className="kicker">{cat?.name}</span>
          <h3 className="card__title">
            <Link href={href}>{article.title}</Link>
          </h3>
          <p className="card__chapo">{article.chapo}</p>
          <p className="card__meta">
            {article.author} · {formatDate(article.date)}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="card">
      <Link href={href} className="card__visual">
        <ArticleImage image={article.image} alt={article.image.caption} />
      </Link>
      <div className="card__body">
        <span className="kicker">{cat?.name}</span>
        <h3 className="card__title">
          <Link href={href}>{article.title}</Link>
        </h3>
        <p className="card__chapo card__chapo--short">{article.chapo}</p>
        <p className="card__meta">{article.readingTime} min de lecture</p>
      </div>
    </article>
  );
}
