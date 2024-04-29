"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { toast } from "sonner"

import { SpinnerButton } from "@/components/shared/spinner-button"

const GoogleLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const params = useSearchParams()
  const next = params.get("next") || "/ai-apps"

  async function handleGoogleLogin() {
    setIsLoading(true)
    try {
      const supabse = createSupabaseBrowserClient()
      await supabse.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/auth/callback?next=` + next,
        },
      })
    } catch (error) {
      console.error(error)
      toast.error("Failed to Sign In with Google!", {
        description: !error,
      })
    }
  }

  return (
    <SpinnerButton
      onClick={handleGoogleLogin}
      isLoading={isLoading}
      buttonClassName="w-full rounded-full"
    >
      Register
    </SpinnerButton>
  )
}

export default GoogleLoginButton
