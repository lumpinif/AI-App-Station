import { Metadata } from "next"
import { ViewTransitions } from "next-view-transitions"

import { siteConfig } from "@/config/site"

import { MobileCategoryNav } from "./_components/mobile-category-nav"

export const metadata: Metadata = {
  title: { default: "Discover AI Apps", template: `%s | ${siteConfig.name}` },
  description:
    "Useful AI Apps submitted by talented authors and creators like you. Updated, prospective and active.",
}

interface AiAppsLayoutProps {
  children: React.ReactNode
}

export default async function AiAppsLayout({ children }: AiAppsLayoutProps) {
  return (
    <>
      <ViewTransitions>
        <div className="flex w-full flex-col">
          <div className="mb-2 md:hidden">
            <MobileCategoryNav />
          </div>
          {children}
        </div>
      </ViewTransitions>

      {/* Floating Side Nav */}
      {/*  <div className="container relative h-full w-full 3xl:!max-w-[80%]">
        <nav className="fixed bottom-1/2 top-1/2 z-40 hidden w-fit -translate-y-1/2 flex-col justify-center md:flex">
          <FloatingSideNav />
        </nav>
        <AiAppsPageWrapper>{children}</AiAppsPageWrapper>
      </div> */}
    </>
  )
}
