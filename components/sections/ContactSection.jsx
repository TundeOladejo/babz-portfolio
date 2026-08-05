import { Mail, Linkedin, Github, FileText } from "lucide-react"
import { SectionLayout } from "./SectionLayout"

const contactLinks = [
  {
    href: "mailto:babatundeoladejo@gmail.com",
    label: "Send email to Babatunde Oladejo",
    icon: Mail,
    title: "Email",
  },
  {
    href: "https://linkedin.com/in/babatunde-oladejo",
    label: "Visit Babatunde Oladejo's LinkedIn profile",
    icon: Linkedin,
    title: "LinkedIn",
    external: true,
  },
  {
    href: "https://github.com/babatunde-oladejo",
    label: "Visit Babatunde Oladejo's GitHub profile",
    icon: Github,
    title: "GitHub",
    external: true,
  },
  {
    href: "/resume.pdf",
    label: "Download Babatunde Oladejo's resume",
    icon: FileText,
    title: "Resume",
    download: true,
  },
]

export function ContactSection() {
  return (
    <SectionLayout id="contact">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
        Get In Touch
      </h2>

      <p className="text-white/60 text-lg leading-relaxed max-w-2xl mb-12">
        I&apos;m open to discussing senior engineering roles, technical
        consulting, and complex system design challenges. Let&apos;s connect.
      </p>

      <div className="flex flex-wrap gap-6">
        {contactLinks.map(({ href, label, icon: Icon, title, external, download }) => (
          <a
            key={title}
            href={href}
            aria-label={label}
            {...(external && { target: "_blank", rel: "noopener" })}
            {...(download && { download: true })}
            className="flex items-center gap-3 px-5 py-3 rounded-lg border border-white/10 text-white/80 hover:text-accent hover:border-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[#1c1c22]"
          >
            <Icon className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm font-medium">{title}</span>
          </a>
        ))}
      </div>
    </SectionLayout>
  )
}
