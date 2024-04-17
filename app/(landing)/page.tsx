import { UnderlayActionSheet } from "@/components/ui/underlay-action-sheet"
import HeroSection from "@/components/landing/HeroSection"

export default function LandingPage() {
  return (
    <>
      <div className="flex flex-col">
        <main className="min-h-dvh flex-1">
          <HeroSection />
          <UnderlayActionSheet />
        </main>
      </div>
    </>
  )
}
