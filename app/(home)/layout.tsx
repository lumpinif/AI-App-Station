import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { SiteFooter } from "@/components/layout/site-footer/site-footer"
import { SiteHeader } from "@/components/layout/site-header/site-header"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.creator}`,
  },
}

interface HomePageLayoutProps {
  children: React.ReactNode
}

export default async function HomePageLayout({
  children,
}: HomePageLayoutProps) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  )
}
