import { SiteFooter } from "@/components/layout/site-footer/site-footer"
import { SiteHeader } from "@/components/layout/site-header/site-header"

export const metadata = {
  title: "Home Page | Landing Page",
  description: "Home Page | Landing Page",
}

interface HomePageLayoutProps {
  children: React.ReactNode
}

export default function HomePageLayout({ children }: HomePageLayoutProps) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  )
}
