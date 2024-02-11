"use client"

import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { useQuery } from "@tanstack/react-query"

const initUser = {
  avatar_url: "",
  created_at: "",
  data_of_birth: "",
  display_name: "",
  email: "",
  full_name: "",
  id: "",
  job: "",
  updated_at: "",
}

export default function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient()
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user) {
        // fetch user information profile
        const { data: user } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()

        return user
      }
      return initUser
    },
  })
}
