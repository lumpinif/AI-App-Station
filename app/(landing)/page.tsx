import { Suspense } from "react"

import HeroSection from "@/components/landing/HeroSection"
import { LandingPageHeader } from "@/components/layout/landing-page-header/landing-page-header"
import { LoadingSpinner } from "@/components/layout/loading-spinner"
import { SiteFooter } from "@/components/layout/site-footer/site-footer"

export default function LandingPage() {
  return (
    <>
      <div className="flex h-dvh flex-col bg-blue-200/20">
        <LandingPageHeader />
        {/* <section className="container grid items-center gap-6 pb-8 sm:pt-6 md:py-10 "> */}
        <Suspense fallback={<LoadingSpinner />}>
          <HeroSection />
        </Suspense>
        {/* </section> */}
      </div>
      <SiteFooter />
    </>
  )
}
