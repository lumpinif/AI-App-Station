"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { GithubIcon } from "lucide-react"
import { toast } from "sonner"

import { ButtonProps } from "@/components/ui/button"
import { SpinnerButton } from "@/components/shared/spinner-button"

type GithubLoginButtonProps = ButtonProps & {}

const GithubLoginButton = ({ ...props }: GithubLoginButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const params = useSearchParams()
  const next = params.get("next") || "/today"

  async function handleGithubLogin() {
    try {
      setIsLoading(true)
      const supabse = createSupabaseBrowserClient()
      await supabse.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${location.origin}/auth/callback?next=` + next,
        },
      })
    } catch (error) {
      setIsLoading(false)
      console.error(error)
      toast.error("Failed to Sign In with Github!", {
        description: !error,
      })
    }
  }

  return (
    <SpinnerButton
      isLoading={isLoading}
      onClick={handleGithubLogin}
      className="w-full rounded-full"
      {...props}
    >
      Github
      <GithubIcon className="ml-2 h-5 w-5" />
    </SpinnerButton>
  )
}

export default GithubLoginButton
