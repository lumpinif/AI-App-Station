import { getUserSession } from "@/app/(auth)/auth-actions"

import { ResponsiveNav } from "./responsive-nav"

export async function SiteHeader() {
  const {
    data: { session },
  } = await getUserSession()

  return (
    <>
      <ResponsiveNav session={session} />
    </>
  )
}
