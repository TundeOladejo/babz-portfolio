"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex items-center py-16 xl:py-24">
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.p
            variants={itemVariants}
            className="text-accent text-sm uppercase tracking-[2px] mb-6"
          >
            Senior Software Engineer · FinTech · Enterprise SaaS · Distributed Systems
          </motion.p>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight mb-8"
          >
            I design reliable software systems for complex business workflows.
          </motion.h1>

          {/* Body */}
          <motion.p
            variants={itemVariants}
            className="text-white/60 text-lg leading-relaxed mb-12"
          >
            I&apos;m Babatunde Oladejo, a Senior Software Engineer based in Oyo, Nigeria,
            with more than six years of experience delivering fintech platforms, enterprise
            applications, and transaction-driven systems. I work across system architecture,
            backend engineering, product development, and technical leadership—turning complex
            requirements into reliable, maintainable software.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col xl:flex-row gap-4"
          >
            <Button asChild size="lg">
              <Link href="/case-studies">View Engineering Case Studies</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/writing">Read Technical Writing</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/babatunde_resume.pdf" download>
                Download Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
