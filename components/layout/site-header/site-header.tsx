import { getUserSession } from "@/utils/supabase/actions/auth"

import UserAvatar from "@/components/auth/avatar/user-avatar"

import MainNav from "./main-nav"

export async function SiteHeader() {
  // const {
  //   data: { session },
  // } = await getUserSession()

  return (
    <>
      <MainNav>{/* <UserAvatar session={session} /> */}</MainNav>
    </>
  )
}
