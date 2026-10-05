import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { articlesByCategory, getCategory } from "@/lib/articles";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  return { title: getCategory((await params).slug)?.name ?? "Rubrique" };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();
  const items = articlesByCategory(slug);

  return (
    <div className="container">
      <h1 className="page-title">{cat.name}</h1>
      <div className="list">
        {items.map((a) => (
          <ArticleCard key={a.slug} article={a} variant="list" />
        ))}
        {items.length === 0 && <p>Aucun article dans cette rubrique pour le moment.</p>}
      </div>
    </div>
  );
}
