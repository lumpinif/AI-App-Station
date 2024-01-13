import getUserSession from "@/utils/supabase/actions"

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
