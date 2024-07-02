import { getUser } from "@/server/auth"

import AiAppsPageIntro from "@/components/landing/ai-apps-page-intro"
import HeroSection from "@/components/landing/magic-ui/hero-section"
import TodayPageIntro from "@/components/landing/today-page-intro"

export default async function LandingPage() {
  const { user } = await getUser()

  return (
    <main className="mx-auto flex min-h-dvh animate-magic-fade-in flex-col space-y-20 sm:space-y-44">
      <HeroSection user={user} />
      <AiAppsPageIntro />
      <TodayPageIntro />

      {/* <CallToActionSection /> */}
    </main>
  )
}
