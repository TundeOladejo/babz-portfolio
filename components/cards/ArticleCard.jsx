"use client"

export function ArticleCard({ title, excerpt, href, publishDate }) {
  const formattedDate = publishDate
    ? new Date(publishDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  return (
    <article
      className={
        "group rounded-xl border border-white/10 bg-primary p-6 transition-all duration-300 " +
        "hover:border-accent hover:shadow-[0_0_15px_rgba(0,255,153,0.15)]"
      }
    >
      {formattedDate && (
        <time
          dateTime={publishDate}
          className="mb-2 block text-sm text-white/40"
        >
          {formattedDate}
        </time>
      )}

      <h3 className="mb-3 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-accent">
        {title}
      </h3>

      <p className="mb-4 text-sm leading-relaxed text-white/60">{excerpt}</p>

      <a
        href={href}
        target="_blank"
        rel="noopener"
        aria-label={`Read article: ${title}`}
        className={
          "inline-flex items-center gap-1 text-sm font-medium text-accent " +
          "transition-colors duration-300 hover:text-accent-hover " +
          "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-primary rounded"
        }
      >
        Read Article
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
      </a>
    </article>
  )
}
