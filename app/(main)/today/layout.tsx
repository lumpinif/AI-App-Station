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
      <section className="contianer grid items-center gap-6 px-4 pb-8 sm:pt-6 md:py-10 ">
        {children}
      </section>
    </>
  )
}
