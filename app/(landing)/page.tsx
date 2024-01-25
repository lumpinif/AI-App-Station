import { Suspense } from "react"

import HeroSection from "@/components/landing/HeroSection"
import { LoadingSpinner } from "@/components/layout/loading-spinner"
import { SiteFooter } from "@/components/layout/site-footer/site-footer"

export default function LandingPage() {
  return (
    <>
      <div className="h-[2000px]">
        <section className="container grid items-center gap-6 pb-8 sm:pt-6 md:py-10 ">
          <Suspense fallback={<LoadingSpinner />}>
            <HeroSection />
          </Suspense>
        </section>
        <LoadingSpinner />
      </div>
      <SiteFooter />
    </>
  )
}
