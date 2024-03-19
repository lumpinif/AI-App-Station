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
    <>
      <div className="container">
        <TodayPageTitle />
      </div>
      <main className="container mt-3 flex h-full flex-col">
        <>
          {children}
          {modal}
        </>
      </main>
    </>
  )
}
