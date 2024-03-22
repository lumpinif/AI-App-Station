"use client"

import { useState } from "react"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { toast } from "sonner"

import useUser from "@/hooks/react-hooks/use-user"
import { Button } from "@/components/ui/button"
import SignOutButton from "@/components/auth/signout/sign-out-button"

export default function AccountFormSupabase() {
  const supabase = createSupabaseBrowserClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  // const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)

  const { data: profile, isFetching } = useUser()

  if (isFetching) {
    setLoading(true)
  }

  if (profile) {
    setFullname(profile.full_name)
    setUsername(profile.display_name)
    // setWebsite(data.website)
    setAvatarUrl(profile.avatar_url)
  }

  async function updateProfile({
    fullname,
    username,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from("profiles").upsert({
        id: profile?.id as string,
        email: profile?.email as string,
        full_name: fullname,
        display_name: username,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      toast.success("Profile updated for", {
        description: <text>{fullname}</text>,
      })
    } catch (error) {
      toast.error("Failed to update profile!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={profile?.email} disabled />
      </div>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={fullname || ""}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="url"
          // value={website || ""}
          // onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <Button
          onClick={() => updateProfile({ fullname, username, avatar_url })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </Button>
      </div>
      <div>
        <SignOutButton />
      </div>
    </div>
  )
}
