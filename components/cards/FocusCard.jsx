"use client"

export function FocusCard({ icon, title, description }) {
  return (
    <div
      className={
        "group rounded-xl border border-white/10 bg-primary p-6 transition-all duration-300 " +
        "hover:border-accent hover:shadow-[0_0_15px_rgba(0,255,153,0.15)] " +
        "active:border-accent active:shadow-[0_0_15px_rgba(0,255,153,0.15)]"
      }
    >
      <div className="mb-4 text-accent">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-white/60">{description}</p>
    </div>
  )
}
