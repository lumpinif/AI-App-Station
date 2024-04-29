"use client"

import { getUserProfile } from "@/server/auth"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

const initUser = {
  user_id: "",
  email: "",
  user_name: "",
  avatar_url: "",
  created_at: "",
  updated_at: "",
  full_name: "",
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
