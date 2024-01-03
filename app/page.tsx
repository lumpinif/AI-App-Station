import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import HeroSection from "@/components/home/HeroSection"

export default function IntroductionPage() {
  return (
    <div className="h-[2000px]">
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 ">
        <HeroSection />
      </section>
    </div>
  )
}
