import { ViewTransitions } from "next-view-transitions"

interface TodayPageLayoutProps {
  children: React.ReactNode
  // modal: React.ReactNode
}
export default async function TodayPageLayout({
  children,
  // modal,
}: TodayPageLayoutProps) {
  return (
    <ViewTransitions>
      <main className="container flex w-full flex-col gap-y-4 sm:my-4 md:my-8 md:gap-y-6 lg:my-10 lg:gap-y-8">
        {children}
        {/* {modal} */}
      </main>
    </ViewTransitions>
  )
}
