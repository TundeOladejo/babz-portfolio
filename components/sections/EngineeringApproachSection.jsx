"use client"

import { SectionLayout } from "@/components/sections/SectionLayout"

const approaches = [
  {
    title: "Event-Driven Architecture",
    description:
      "I design systems around domain events rather than procedural calls. This decouples services, enables audit trails, and makes complex workflows—like payment state machines or inspection pipelines—observable and recoverable by default.",
  },
  {
    title: "Domain Modeling",
    description:
      "Before writing code, I map the business domain. Entities, aggregates, and bounded contexts guide the system structure. This produces software that speaks the language of the business and adapts as requirements evolve.",
  },
  {
    title: "Modular Design",
    description:
      "I structure codebases into cohesive, loosely-coupled modules with clear boundaries. Each module owns its data, exposes a deliberate API, and can be tested, deployed, or replaced independently.",
  },
  {
    title: "Technical Ownership",
    description:
      "I take end-to-end responsibility—from architecture decisions through production monitoring. Ownership means understanding trade-offs, documenting decisions, mentoring teammates, and being accountable for system reliability.",
  },
]

export function EngineeringApproachSection() {
  return (
    <SectionLayout id="engineering-approach" background="subtle">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Engineering Approach
      </h2>
      <p className="text-white/60 text-lg max-w-2xl mb-12">
        The principles that guide how I design, build, and maintain software systems.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {approaches.map((approach) => (
          <div
            key={approach.title}
            className="border border-white/10 rounded-lg p-6 hover:border-accent/50 transition-colors duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-3">
              {approach.title}
            </h3>
            <p className="text-white/60 leading-relaxed">
              {approach.description}
            </p>
          </div>
        ))}
      </div>
    </SectionLayout>
  )
}
