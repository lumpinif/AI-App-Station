import FloatingSideNav from "../../../components/layout/side-menu/floating-side-nav"

interface AiAppsLayoutProps {
  children: React.ReactNode
}
export default async function AiAppsLayout({ children }: AiAppsLayoutProps) {
  return (
    <>
      {/* <div className="h-full flex-1 gap-2 sm:grid sm:grid-cols-[110px_minmax(0,1fr)]"> */}
      <div className="fixed bottom-1/2 top-1/2 hidden -translate-y-1/2 flex-col justify-center sm:flex">
        <FloatingSideNav />
      </div>
      <main className="h-full rounded-2xl p-2 shadow-outline sm:ml-32">
        {/* TODO: CONSIDERIGN ADD PROGRESSIVE BLUR TO THE EDGE OF THE SCROLLAREA */}
        {children}
      </main>
      {/* </div> */}
    </>
  )
}
