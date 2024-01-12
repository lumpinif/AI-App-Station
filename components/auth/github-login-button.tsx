"use client"

import { useState } from "react"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { GithubIcon } from "lucide-react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const GithubLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const supabse = createSupabaseBrowserClient()

  async function handleGithubLogin() {
    setIsLoading(true)
    try {
      await supabse.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      })
    } catch (error) {
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
      <AiOutlineLoading3Quarters
        className={cn("mr-2 h-4 w-4 animate-spin", { hidden: !isLoading })}
      />
      Github
      <GithubIcon className="ml-2 h-5 w-5" />
    </Button>
  )
}

export default GithubLoginButton
