import { ViewTransitions } from "next-view-transitions"

import TodayPageTitle from "./_components/today-page-title"

interface TodayPageLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}
export default async function TodayPageLayout({
  children,
  modal,
}: TodayPageLayoutProps) {
  return (
    <ViewTransitions>
      <main className="container flex flex-col">
        {children}
        {modal}
      </main>
    </ViewTransitions>
  )
}
