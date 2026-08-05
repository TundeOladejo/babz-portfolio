"use client"

import { SectionLayout } from "@/components/sections/SectionLayout"
import { CaseStudyCard } from "@/components/cards/CaseStudyCard"
import { getFeaturedCaseStudies } from "@/lib/data/case-studies"

export function CaseStudiesSection() {
  const studies = getFeaturedCaseStudies()

  return (
    <SectionLayout id="case-studies">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
        Selected Engineering Case Studies
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studies.map((study) => (
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
    </SectionLayout>
  )
}
