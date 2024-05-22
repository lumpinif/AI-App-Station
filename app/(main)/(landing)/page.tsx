import { UnderlayActionSheet } from "@/components/ui/underlay-action-sheet"
import HeroSection from "@/components/landing/HeroSection"

export default function LandingPage() {
  return (
    <main className="flex flex-col">
      <section className="min-h-dvh flex-1">
        <HeroSection />
        <UnderlayActionSheet />
      </section>
    </main>
  )
}
