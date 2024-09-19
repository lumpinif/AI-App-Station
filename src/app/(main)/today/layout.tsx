import { Metadata } from "next"
import { ViewTransitions } from "next-view-transitions"

import { siteConfig } from "@/config/site"

interface TodayPageLayoutProps {
  children: React.ReactNode
  // modal: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    default: "Today's AI News and Apps for you",
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "AI News of the Day, and AI App of the Day. Carefully curated by talented authors and creators. Daily updated.",
}

export default async function TodayPageLayout({
  children,
  // modal,
}: TodayPageLayoutProps) {
  return (
    <ViewTransitions>
      <main className="flex w-full flex-col gap-y-4 md:gap-y-6 lg:gap-y-8">
        {children}
        {/* {modal} */}
      </main>
    </ViewTransitions>
  )
}
