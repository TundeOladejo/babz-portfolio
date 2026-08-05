"use client"

import { featuredArticles } from "@/lib/data/homepage"
import { ArticleCard } from "@/components/cards/ArticleCard"
import { SectionLayout } from "@/components/sections/SectionLayout"

export function TechnicalWritingSection() {
  return (
    <SectionLayout id="technical-writing">
      <h2 className="text-3xl font-bold text-white mb-12">Technical Writing</h2>
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
    </SectionLayout>
  )
}
