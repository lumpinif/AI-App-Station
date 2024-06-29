import { Metadata } from "next"
import { ViewTransitions } from "next-view-transitions"

import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: { default: "Stories about AI", template: `%s | ${siteConfig.name}` },
  description:
    "Brilliant stories about AI, written by talented authors and creators.",
}

export default function StoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ViewTransitions>
      <main className="container">{children}</main>
    </ViewTransitions>
  )
}
