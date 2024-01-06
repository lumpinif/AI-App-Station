import AuthModal from "@/components/auth/auth-modal"
import { SiteHeader } from "@/components/layout/site-header/site-header"

export const metadata = {
  title: "Today's AI Page | Today's AI Page",
  description: "Today's AI Page | Today's AI Page",
}

interface TodayPageLayoutProps {
  children: React.ReactNode
}

export default function TodayPageLayout({ children }: TodayPageLayoutProps) {
  return (
    <>
      <SiteHeader />
      <section className="container grid items-center gap-6 pb-8 sm:pt-6 md:py-10 ">
        {children}
      </section>
    </>
  )
}
