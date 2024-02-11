import { useCallback, useEffect, useState } from "react"
import { getUserProfile } from "@/server/auth"
import { User } from "@supabase/auth-helpers-nextjs"
import { toast } from "sonner"

// Function for fetching user profile
const fetchUserProfile = async (user: User | null) => {
  if (!user) return null

  const { profile, error } = await getUserProfile()

  if (error) {
    toast.error(`Error loading user data: ${error || "Unknown error"}`)
    return null
  }

  // check avatar_url is same as the one from user_metadata

  const avatarUrl =
    profile && profile.avatar_url !== user.user_metadata?.avatar_url
      ? user.user_metadata?.avatar_url
      : profile?.avatar_url

  return profile ? { avatarUrl: avatarUrl, fullname: profile.full_name } : null
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
