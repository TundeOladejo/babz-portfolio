"use client"

import Link from "next/link"

export function CaseStudyCard({ slug, title, problem, ownership, themes }) {
  return (
    <article
      className={
        "group rounded-xl border border-white/10 bg-primary p-6 transition-all duration-300 " +
        "hover:-translate-y-1 hover:border-accent hover:shadow-[0_0_15px_rgba(0,255,153,0.15)]"
      }
    >
      <h3 className="mb-3 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-accent">
        {title}
      </h3>

      <p className="mb-3 text-sm leading-relaxed text-white/60">{problem}</p>

      <p className="mb-4 text-sm text-white/40">{ownership}</p>

      <div className="mb-5 flex flex-wrap gap-2">
        {themes.slice(0, 3).map((theme) => (
          <span
            key={theme}
            className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
          >
            {theme}
          </span>
        ))}
      </div>

      <Link
        href={`/case-studies/${slug}`}
        aria-label={`View Case Study: ${title}`}
        className={
          "inline-flex items-center gap-1 text-sm font-medium text-accent " +
          "transition-colors duration-300 hover:text-accent-hover " +
          "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-primary rounded"
        }
      >
        View Case Study
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </Link>
    </article>
  )
}
