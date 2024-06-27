import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getUserData } from "@/server/auth"

import { UserPagesWrapper } from "./_components/layout/user-pages-wrapper"
import { ResizeableSideBar } from "./_components/resizeable/resizeable-side-bar"

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    data: { user },
  } = await getUserData()

  if (!user?.id) {
    redirect("/signin?next=/user")
  }

  const layout = cookies().get("react-resizable-panels:layout")
  const collapsed = cookies().get("react-resizable-panels:collapsed")

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

  return (
    <main className="container relative h-full md:pt-4">
      <ResizeableSideBar
        navCollapsedSize={5}
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
      >
        {/* <ScrollArea className="h-[calc(100svh-6rem)] w-full pr-1 sm:pr-2"> */}

        <UserPagesWrapper>{children}</UserPagesWrapper>

        {/* <ScrollBar orientation="horizontal" /> */}
        {/* </ScrollArea> */}
      </ResizeableSideBar>
    </main>
  )
}
