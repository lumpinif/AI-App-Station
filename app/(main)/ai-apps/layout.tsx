import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import FloatingSideNav from "../../../components/layout/side-menu/floating-side-nav"

interface AiAppsLayoutProps {
  children: React.ReactNode
}
export default async function AIAppsLayout({ children }: AiAppsLayoutProps) {
  return (
    <>
      <div className="mb-10 border-b p-6">
        <div className="flex-1 items-start md:grid md:grid-cols-[200px_minmax(0,1fr)] lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-5">
          <aside className="fixed top-24 z-30 hidden h-[calc(100vh-10rem)] w-[200px] shrink-0 px-1 md:sticky md:block">
            <ScrollArea className="h-full rounded-3xl">
              <FloatingSideNav />
              <ScrollBar className="w-1.5 opacity-100 dark:w-1" />
            </ScrollArea>
          </aside>
          <main className="-ml-28 h-dvh rounded-3xl p-6 dark:shadow-outline">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
