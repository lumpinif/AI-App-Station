import HeroSection from "@/components/landing/HeroSection"
import { LandingPageHeader } from "@/components/layout/landing-page-header/landing-page-header"
import { SiteFooter } from "@/components/layout/site-footer/site-footer"

export default function LandingPage() {
  return (
    <>
      <div className="flex h-dvh flex-col">
        <LandingPageHeader />
        <HeroSection />
      </div>
      <SiteFooter />
    </>
  )
}
