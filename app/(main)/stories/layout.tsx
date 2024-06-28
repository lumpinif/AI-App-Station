import { Metadata } from "next"
import { ViewTransitions } from "next-view-transitions"

export const metadata: Metadata = {
  title: "Stories about AI",
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
