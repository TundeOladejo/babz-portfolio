"use client"

import { Banknote, Building2, Network, Shield } from "lucide-react"
import { focusAreas } from "@/lib/data/homepage"
import { FocusCard } from "@/components/cards/FocusCard"
import { SectionLayout } from "@/components/sections/SectionLayout"

const iconMap = {
  Banknote,
  Building2,
  Network,
  Shield,
}

export function EngineeringFocusSection() {
  return (
    <SectionLayout id="engineering-focus" background="subtle">
      <h2 className="text-3xl font-bold text-white mb-12">Engineering Focus</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {focusAreas.map((area) => {
          const Icon = iconMap[area.icon]
          return (
            <FocusCard
              key={area.title}
              icon={Icon ? <Icon className="w-8 h-8" /> : null}
              title={area.title}
              description={area.description}
            />
          )
        })}
      </div>
    </SectionLayout>
  )
}
