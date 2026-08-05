import { featuredArticles } from "@/lib/data/homepage"
import { ArticleCard } from "@/components/cards/ArticleCard"

export const metadata = {
  title: "Engineering Writing",
  description:
    "Technical articles on system design, architecture patterns, and engineering practices.",
}

export default function WritingPage() {
  return (
    <section className="container mx-auto py-16 xl:py-24">
      <h1 className="text-4xl font-bold text-white mb-4">
        Engineering Writing
      </h1>
      <p className="text-white/60 text-lg mb-12">
        Technical articles on system design, architecture patterns, and
        engineering practices.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredArticles.map((article) => (
          <ArticleCard
            key={article.title}
            title={article.title}
            excerpt={article.excerpt}
            href={article.href}
            publishDate={article.publishDate}
          />
        ))}
      </div>
    </section>
  )
}
