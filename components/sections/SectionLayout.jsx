"use client"

import { motion } from "framer-motion"

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const bgClasses = {
  default: "",
  subtle: "bg-white/[0.02]",
  accent: "bg-accent/5",
}

export function SectionLayout({ id, children, className, background = "default" }) {
  return (
    <>
      <noscript>
        <style>{`#${id} { opacity: 1 !important; transform: none !important; }`}</style>
      </noscript>
      <motion.section
        id={id}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className={`py-16 xl:py-24 ${bgClasses[background] || ""} ${className || ""}`}
      >
        <div className="container mx-auto">
          {children}
        </div>
      </motion.section>
    </>
  )
}
