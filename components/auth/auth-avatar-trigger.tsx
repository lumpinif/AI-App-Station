import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { Session } from "@supabase/auth-helpers-nextjs"

import useAuthModal from "@/hooks/use-auth-modal-store"

import { Icons } from "../icons/icons"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const AuthAvatarTrigger = () => {
  // const [session, setSession] = useState<Session | null>(null)
  const OpenModal = useAuthModal((state) => state.OpenModal)
  // const supabase = createSupabaseBrowserClient()
  // const router = useRouter()

  // useEffect(() => {
  //   const getUserSession = async () => {
  //     const {
  //       data: { session },
  //     } = await supabase.auth.getSession()
  //     setSession(session)
  //     router.refresh()
  //   }
  //   getUserSession()
  // }, [supabase.auth, router])

  // console.log("🚀 ~ getUserSession ~ session:", session)

  return (
    <>
      <button onClick={OpenModal}>
        <Avatar className="cursor-pointer outline-none">
          <Icons.user size={40} />
        </Avatar>
      </button>
    </>
  )
}

export default AuthAvatarTrigger
