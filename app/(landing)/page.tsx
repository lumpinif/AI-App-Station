import { Suspense } from "react"

import HeroSection from "@/components/landing/HeroSection"
import { LoadingSpinner } from "@/components/layout/loading-spinner"
import { SiteFooter } from "@/components/layout/site-footer/site-footer"
import { SiteHeader } from "@/components/layout/site-header/site-header"

export default function LandingPage() {
  return (
    <>
      <div className="flex h-dvh flex-col bg-blue-200/20">
        <SiteHeader />
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
