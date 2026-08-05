import { HeroSection } from "@/components/sections/HeroSection"
import { EngineeringFocusSection } from "@/components/sections/EngineeringFocusSection"
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection"
import { EngineeringApproachSection } from "@/components/sections/EngineeringApproachSection"
import { TechnicalWritingSection } from "@/components/sections/TechnicalWritingSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { ContactSection } from "@/components/sections/ContactSection"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <EngineeringFocusSection />
      <CaseStudiesSection />
      <EngineeringApproachSection />
      <TechnicalWritingSection />
      <AboutSection />
      <ContactSection />
    </main>
  )
}
