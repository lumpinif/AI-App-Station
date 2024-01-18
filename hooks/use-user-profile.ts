import { useCallback, useEffect, useState } from "react"
import { User } from "@supabase/auth-helpers-nextjs"
import { toast } from "sonner"

import { getUserProfile } from "@/app/(auth)/auth-actions"

// Function for fetching user profile
const fetchUserProfile = async (user: User | null) => {
  if (!user) return null

  try {
    const { data, error, status } = await getUserProfile(user)

    if (error && status !== 406) {
      toast.error(`Error loading user data: ${error || "Unknown error"}`)
      return null
    }

    // check avatar_url is same as the one from user_metadata

    const avatarUrl =
      data && data.avatar_url !== user.user_metadata?.avatar_url
        ? user.user_metadata?.avatar_url
        : data?.avatar_url

    return data ? { avatarUrl: avatarUrl, fullname: data.full_name } : null
  } catch (error) {
    toast.error(`Error loading user data: ${error || "Unknown error"}`)
    return null
  }
}

// Custom hook for fetching user profile
export const useUserProfile = (user: User | null) => {
  const [loading, setLoading] = useState(false)

  const [profile, setProfile] = useState<{
    avatarUrl: string | null
    fullname: string | null
  }>({ avatarUrl: null, fullname: null })

  const getProfile = useCallback(async () => {
    setLoading(true)
    const profile = await fetchUserProfile(user)
    if (profile) {
      setProfile(profile)
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    getProfile()
  }, [getProfile])

  return { loading, ...profile }
}
