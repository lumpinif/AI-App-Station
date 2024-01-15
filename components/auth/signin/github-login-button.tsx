"use client"

import { useState } from "react"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { GithubIcon } from "lucide-react"
import { RingLoader } from "react-spinners"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

const GithubLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  async function handleGithubLogin() {
    try {
      setIsLoading(true)
      const supabse = createSupabaseBrowserClient()
      await supabse.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${location.origin}/auth/callback`,
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
    <Button
      onClick={handleGithubLogin}
      className="w-full rounded-full"
      disabled={isLoading}
    >
      {isLoading && (
        <span className="mr-2">
          <RingLoader size={15} speedMultiplier={1.5} color="gray" />
        </span>
      )}
      Github
      <GithubIcon className="ml-2 h-5 w-5" />
    </Button>
  )
}

export default GithubLoginButton
