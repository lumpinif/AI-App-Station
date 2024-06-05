import CallToActionSection from "@/components/landing/magic-ui/cta-section"
import HeroSection from "@/components/landing/magic-ui/hero-section"

export default function LandingPage() {
  return (
    <main className="mx-auto min-h-dvh overflow-hidden">
      <HeroSection />
      <CallToActionSection />
    </main>
  )
}
