"use client"

import { getUserProfile } from "@/server/auth"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

const initUser = {
  avatar_url: "",
  created_at: "",
  data_of_birth: "",
  display_name: "",
  email: "",
  full_name: "",
  user_id: "",
  job: "",
  updated_at: "",
}

export default function useUser() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchUserProfile,
  })
}

async function fetchUserProfile() {
  const { profile, error } = await getUserProfile()

  if (error) {
    toast.error(`Error loading profile! Please try again later.`)
  }

  return profile || initUser
}
