"use client"

import { useState } from "react"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { FcGoogle } from "react-icons/fc"
import { RingLoader } from "react-spinners"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

const GoogleLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  async function handleGoogleLogin() {
    setIsLoading(true)
    try {
      const supabse = createSupabaseBrowserClient()
      await supabse.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/auth/callback`,
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
    <Button
      onClick={handleGoogleLogin}
      className="w-full rounded-full"
      disabled={isLoading}
    >
      {isLoading && (
        <span className="mr-2">
          <RingLoader size={15} speedMultiplier={1.5} color="gray" />
        </span>
      )}
      Google
      <FcGoogle className="ml-2 h-5 w-5" />
    </Button>
  )
}

export default GoogleLoginButton
