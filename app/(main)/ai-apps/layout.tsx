import FloatingSideNav from "../../../components/ai-apps/floating-side-nav"

interface AiAppsLayoutProps {
  children: React.ReactNode
}
export default async function AIAppsLayout({ children }: AiAppsLayoutProps) {
  return (
    <>
      <div className="md:flex">
        <div className="hidden md:flex">
          <FloatingSideNav />
        </div>
        <main className="container ml-2 flex-1 bg-muted">{children}</main>
      </div>
    </>
  )
}
