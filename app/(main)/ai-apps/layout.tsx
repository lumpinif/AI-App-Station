import AiAppsPageWrapper from "@/components/layout/side-menu/ai-apps-page-wrapper"
import AiAppsPageTitle from "@/app/(main)/ai-apps/_components/ai-apps-page-title"

import FloatingSideNav from "../../../components/layout/side-menu/floating-side-nav"
import { MobileCategoryNav } from "./_components/mobile-category-nav"
import StickyFloatingHeader from "./collections/[collection]/sticky-bar"

interface AiAppsLayoutProps {
  children: React.ReactNode
}
export default async function AiAppsLayout({ children }: AiAppsLayoutProps) {
  return (
    <>
      {/* TODO: Continue building sticky floating header */}
      {/* <StickyFloatingHeader /> */}
      {/* Mobile scrolling nav */}
      <div className="container">
        <AiAppsPageTitle />
      </div>
      <div className="container">
        <MobileCategoryNav />
      </div>

      <div className="container flex h-full w-full gap-4">
        {/* Floating Side Nav */}
        <nav className="fixed bottom-1/2 top-1/2 hidden w-fit -translate-y-1/2 flex-col justify-center sm:flex">
          <FloatingSideNav />
        </nav>
        <AiAppsPageWrapper className="h-[2000px] ">
          {/* TODO: CONSIDERIGN ADD PROGRESSIVE BLUR TO THE EDGE OF THE SCROLLAREA */}
          {children}
        </AiAppsPageWrapper>
      </div>
    </>
  )
}
