import AuthModal from "@/components/auth/avatar/auth-modal"
import UserAvatar from "@/components/auth/avatar/user-avatar"
import { getUserSession } from "@/app/(auth)/auth-actions"

import MainNav from "./main-nav"

export async function SiteHeader() {
  const {
    data: { session },
  } = await getUserSession()

  return (
    <>
      <AuthModal session={session} />
      <MainNav>
        <UserAvatar session={session} />
      </MainNav>
    </>
  )
}
