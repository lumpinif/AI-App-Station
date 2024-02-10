"use client"

import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { useQuery } from "@tanstack/react-query"

const initUser = {
  id: "",
  email: "",
  full_name: "",
  display_name: "",
  avatar_url: "",
  data_of_birth: "",
  job: "",
  website: "",
  created_at: "",
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
