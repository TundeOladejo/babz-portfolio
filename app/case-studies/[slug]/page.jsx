import { getCaseStudy, getAllCaseStudySlugs } from "@/lib/data/case-studies";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

function CaseStudySection({ section }) {
  switch (section.type) {
    case "text":
      return (
        <section>
          <h2 className="h3 mb-4">{section.heading}</h2>
          <p className="text-white/70 leading-relaxed">{section.content}</p>
        </section>
      );
    case "list":
      return (
        <section>
          <h2 className="h3 mb-4">{section.heading}</h2>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            {section.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      );
    case "diagram":
      return (
        <section>
          <h2 className="h3 mb-4">{section.heading}</h2>
          <div
            className="border border-white/10 rounded-lg p-6 bg-white/[0.02]"
            role="img"
            aria-label={section.description}
          >
            <p className="text-white/60 italic">{section.description}</p>
          </div>
        </section>
      );
    default:
      return null;
  }
}

export default function CaseStudyPage({ params }) {
  const caseStudy = getCaseStudy(params.slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <article className="container mx-auto py-16 xl:py-24">
      <header className="mb-16">
        <span className="text-accent text-sm uppercase tracking-wider font-semibold">
          {caseStudy.category}
        </span>
        <h1 className="h1 mt-4">{caseStudy.title}</h1>
        <p className="text-white/60 text-xl mt-6 max-w-3xl">
          {caseStudy.problem}
        </p>
      </header>

      <div className="space-y-16">
        {caseStudy.sections.map((section, index) => (
          <CaseStudySection key={index} section={section} />
        ))}
      </div>
    </article>
  );
}
