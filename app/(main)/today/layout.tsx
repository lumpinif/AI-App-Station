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
      <div className="container flex flex-col">
        <TodayPageTitle />
        <main className="mt-5 flex-1">
          {children}
          {modal}
        </main>
      </div>
    </ViewTransitions>
  )
}
