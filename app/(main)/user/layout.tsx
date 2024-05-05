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
  const { data, error } = await getUserData()
  if (error || !data?.user) {
    redirect("/login")
  }

  const layout = cookies().get("react-resizable-panels:layout")
  const collapsed = cookies().get("react-resizable-panels:collapsed")

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

  return (
    <main className="container h-full md:pt-8">
      <ResizeableSideBar
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={5}
      >
        <UserPagesWrapper>{children}</UserPagesWrapper>
      </ResizeableSideBar>
    </main>
  )
}
