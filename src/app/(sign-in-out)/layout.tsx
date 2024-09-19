import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import PageTransition from "@/components/shared/page-transition"

export const metadata: Metadata = {
  title: `Welcome to ${siteConfig.name}`,
  description: "Auth | Sign in | Sign out",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageTransition>
      <main className="bg-background">{children}</main>
    </PageTransition>
  )
}
