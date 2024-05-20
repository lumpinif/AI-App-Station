import { getUserData } from "@/server/auth"

import AiAppsPageWrapper from "@/components/layout/side-menu/ai-apps-page-wrapper"
import { AppSubmitModal } from "@/components/submit/app-submit-modal"

import FloatingSideNav from "../../../components/layout/side-menu/floating-side-nav"
import { MobileCategoryNav } from "./_components/mobile-category-nav"

interface AiAppsLayoutProps {
  children: React.ReactNode
}
export default async function AiAppsLayout({ children }: AiAppsLayoutProps) {
  const {
    data: { user },
    error: getUserError,
  } = await getUserData()

  if (getUserError) {
    console.error(getUserError)
  }

  return (
    <>
      {/* TODO: Continue building sticky floating header */}
      {/* <StickyFloatingHeader /> */}
      {/* Mobile scrolling nav */}

      <AppSubmitModal user={user} />

      <div className="container mb-2">
        <MobileCategoryNav />
      </div>

      <div className="container flex h-full w-full gap-6">
        {/* Floating Side Nav */}
        <nav className="fixed bottom-1/2 top-1/2 z-40 hidden w-fit -translate-y-1/2 flex-col justify-center md:flex">
          <FloatingSideNav />
        </nav>
        <AiAppsPageWrapper>{children}</AiAppsPageWrapper>
      </div>
    </>
  )
}
