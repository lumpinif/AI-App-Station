import { redirect } from "next/navigation"
import { getUser, getUserProfile } from "@/server/auth"

import { checkIsSuperUser } from "@/lib/utils"
import AiAppsPageIntro from "@/components/landing/ai-apps-page-intro"
import HeroSection from "@/components/landing/magic-ui/hero-section"
import TodayPageIntro from "@/components/landing/today-page-intro"

export default async function LandingPage() {
  const { user } = await getUser()
  const { profile } = await getUserProfile()
  const isSuperUser = checkIsSuperUser(profile?.profile_role?.role)

  // redirect to /ai-apps if it is not super user
  if (!isSuperUser) {
    redirect("/ai-apps")
  }

  return (
    <main className="mx-auto flex min-h-dvh animate-magic-fade-in flex-col space-y-20 sm:space-y-44">
      <HeroSection user={user} />
      <AiAppsPageIntro />
      <TodayPageIntro />

      {/* <CallToActionSection /> */}
    </main>
  )
}
