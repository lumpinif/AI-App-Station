"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { FcGoogle } from "react-icons/fc"
import { toast } from "sonner"

import { ButtonProps } from "@/components/ui/button"
import { SpinnerButton } from "@/components/shared/spinner-button"

type GooglebLoginButtonProps = ButtonProps & {}

const GoogleLoginButton = ({ ...props }: GooglebLoginButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const params = useSearchParams()
  const next = params.get("next") || "/today"

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
      className="w-full rounded-full"
      {...props}
    >
      Google
      <FcGoogle className="ml-2 h-5 w-5" />
    </SpinnerButton>
  )
}

export default GoogleLoginButton
