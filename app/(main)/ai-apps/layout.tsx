import { Metadata } from "next"

import AiAppsPageWrapper from "@/components/layout/side-menu/ai-apps-page-wrapper"

import FloatingSideNav from "../../../components/layout/side-menu/floating-side-nav"
import { MobileCategoryNav } from "./_components/mobile-category-nav"

export const metadata: Metadata = {
  title: "Discover AI Apps",
  description:
    "Useful AI Apps submitted by talented authors and creators like you. Updated, prospective and active.",
}

interface AiAppsLayoutProps {
  children: React.ReactNode
}

export default async function AiAppsLayout({ children }: AiAppsLayoutProps) {
  return (
    <>
      {/* TODO: Continue building sticky floating header */}
      {/* <StickyFloatingHeader /> */}
      {/* Mobile scrolling nav */}

      <div className="container mb-2">
        <MobileCategoryNav />
      </div>

      <div className="container relative h-full w-full">
        {/* Floating Side Nav */}
        <nav className="fixed bottom-1/2 top-1/2 z-40 hidden w-fit -translate-y-1/2 flex-col justify-center md:flex">
          <FloatingSideNav />
        </nav>
        <AiAppsPageWrapper>{children}</AiAppsPageWrapper>
      </div>
    </>
  )
}
