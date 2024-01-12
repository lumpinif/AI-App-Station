"use client"

import { useState } from "react"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { GithubIcon } from "lucide-react"
import { ImSpinner3 } from "react-icons/im"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

const GithubLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignInClick = async () => {
    setIsLoading(true)
    const supabase = createSupabaseBrowserClient()

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      })

      if (data) {
        console.log("🚀 ~ handleSignInClick ~ data:", data)
        toast.success("You are logged in.", {
          description: "Welcome back!",
          duration: 5000,
        })
      } else if (error) {
        console.log("🚀 ~ handleSignInClick ~ error:", error)

        toast.error("Something went wrong.", {
          description: error.message || "Please try again later.",
          duration: 5000,
        })
      }
    } catch (error) {
      console.log("🚀 ~ handleSignInClick ~ error:", error)
      toast.error("An unexpected error occurred.", {
        description: "Please try again later.",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleSignInClick}
      className="w-full rounded-full"
      disabled={isLoading}
    >
      {isLoading && <ImSpinner3 className="mr-2 h-4 w-4 animate-spin" />}
      Github
      <GithubIcon className="ml-2 h-5 w-5" />
    </Button>
  )
}

export default GithubLoginButton
