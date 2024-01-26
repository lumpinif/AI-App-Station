import { ScrollArea } from "@/components/ui/scroll-area"

import FloatingSideNav from "../../../components/layout/side-menu/floating-side-nav"

interface AiAppsLayoutProps {
  children: React.ReactNode
}
export default async function AIAppsLayout({ children }: AiAppsLayoutProps) {
  return (
    <>
      <div className="mb-10 border-b">
        <div className="container flex-1 items-start md:grid md:grid-cols-[194px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[194px_minmax(0,1fr)] lg:gap-5">
          <aside className="fixed top-0 z-30 hidden h-[calc(100vh-10rem)] shrink-0 md:sticky md:block">
            <ScrollArea className="h-full rounded-3xl">
              <FloatingSideNav />
            </ScrollArea>
          </aside>
          <main className="h-dvh p-6">{children}</main>
        </div>
      </div>
    </>
  )
}
