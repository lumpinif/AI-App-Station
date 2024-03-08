import TodayPageTitle from "./_components/today-page-title"

interface TodayPageLayoutProps {
  children: React.ReactNode
}
export default async function TodayPageLayout({
  children,
}: TodayPageLayoutProps) {
  return (
    <>
      <div className="container">
        <TodayPageTitle />
      </div>
      <main>{children}</main>
    </>
  )
}
