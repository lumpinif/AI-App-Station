import Link from "next/link"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import PopoverMenu from "@/components/ui/popover-menu"
import BackButton from "@/components/shared/back-button"

export default async function UserAppsPage() {
  // TODO: MOVE THESE DATABASE TRANSCAIONS TO SERVER ACTIONS
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.id) {
    return "no user"
  }
  const { data } = await supabase
    .from("apps")
    .select("app_id,app_title")
    .eq("submitted_by_user_id", user?.id)

  return (
    <>
      <h1 className="container mb-10">
        Welcome to User Apps Page! {user?.email}
      </h1>
      <div className="container flex flex-col space-y-4">
        {data?.map((app) => (
          <Link
            href="/user/apps/[id]"
            as={`/user/apps/${app.app_id}`}
            className="bg-card w-fit rounded-xl px-3"
          >
            {app.app_title}
          </Link>
        ))}
        <PopoverMenu />
      </div>
    </>
  )
}
