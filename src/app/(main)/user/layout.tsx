import { Metadata } from "next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getUserProfile } from "@/server/auth"

import { siteConfig } from "@/config/site"
import { getProfileRoleName } from "@/lib/utils"

import { UserPagesWrapper } from "./_components/layout/user-pages-wrapper"

async function fetchUser() {
  const { profile, error: getProfileError } = await getUserProfile()

  return { profile, getProfileError }
}

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await fetchUser()

  if (!profile) {
    return {}
  }

  const profile_display_name = profile.full_name || profile.user_name
  const profileRoleName = getProfileRoleName(profile.profile_role?.role)

  return {
    title: {
      default: `${profileRoleName} - ${profile_display_name}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: `${profileRoleName} User dashboard for ${profile_display_name}`,
  }
}

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { profile, getProfileError } = await fetchUser()

  if (!profile?.user_id || !profile) {
    redirect("/signin?next=/user")
  }

  if (getProfileError) {
    console.error(getProfileError)
    return (
      <div className="flex flex-col gap-y-2 text-muted-foreground">
        <div className="text-muted-foreground">Failed to get the profile</div>
        <p>Error:{getProfileError.message}</p>
      </div>
    )
  }

  const layout = cookies().get("react-resizable-panels:layout")
  const collapsed = cookies().get("react-resizable-panels:collapsed")

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

  return (
    <>
      <UserPagesWrapper>{children}</UserPagesWrapper>
      {/* <ResizeableSideBar
          navCollapsedSize={4}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
        >
          <ScrollArea className="h-[calc(100svh)] w-full">
            <UserPagesWrapper>{children}</UserPagesWrapper>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </ResizeableSideBar> */}
    </>
  )
}
