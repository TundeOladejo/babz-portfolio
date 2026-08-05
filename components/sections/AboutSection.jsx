import { SectionLayout } from "./SectionLayout"

export function AboutSection() {
  return (
    <SectionLayout id="about">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
        About Me
      </h2>

      <div className="max-w-3xl space-y-6">
        <p className="text-white/60 text-lg leading-relaxed">
          I&apos;m Babatunde Oladejo, a Senior Software Engineer based in Oyo,
          Nigeria, with over 6 years of experience building software that solves
          real business problems. My work spans fintech platforms, enterprise SaaS
          products, and distributed systems—always with a focus on reliability,
          clarity, and long-term maintainability.
        </p>

        <p className="text-white/60 text-lg leading-relaxed">
          I specialize in event-driven architecture, domain modeling, and
          technical leadership. From designing transaction workflows for financial
          platforms to building multi-tenant systems with complex access control, I
          bring a systems-thinking approach to every project. I care deeply about
          getting the abstractions right and delivering software that teams can
          confidently build upon.
        </p>

        <p className="text-white/60 text-lg leading-relaxed">
          Beyond writing code, I focus on technical ownership—taking projects from
          architecture through to production, mentoring engineers, and making sure
          the work we ship actually moves the needle for the business.
        </p>
      </div>
    </SectionLayout>
  )
}
