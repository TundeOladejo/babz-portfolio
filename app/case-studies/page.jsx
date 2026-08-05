import { getAllCaseStudySlugs, getCaseStudy } from "@/lib/data/case-studies"
import { CaseStudyCard } from "@/components/cards/CaseStudyCard"

export const metadata = {
  title: "Engineering Case Studies",
  description: "Detailed engineering case studies covering FinTech, Enterprise SaaS, and Distributed Systems.",
}

export default function CaseStudiesPage() {
  const slugs = getAllCaseStudySlugs()
  const caseStudies = slugs.map((slug) => getCaseStudy(slug)).filter(Boolean)

  return (
    <section className="container mx-auto py-16 xl:py-24 px-4 xl:px-0">
      <h1 className="text-4xl font-bold text-white mb-12">
        Engineering Case Studies
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caseStudies.map((study) => (
          <CaseStudyCard
            key={study.slug}
            slug={study.slug}
            title={study.title}
            problem={study.problem}
            ownership={study.ownership}
            themes={study.themes}
          />
        ))}
      </div>
    </section>
  )
}
