"use client"

import { useState } from "react"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const GithubLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const supabse = createSupabaseBrowserClient()

  async function handleGoogleLogin() {
    setIsLoading(true)
    try {
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
      <AiOutlineLoading3Quarters
        className={cn("mr-2 h-4 w-4 animate-spin", { hidden: !isLoading })}
      />
      Google
      <FcGoogle className="ml-2 h-5 w-5" />
    </Button>
  )
}

export default GithubLoginButton
