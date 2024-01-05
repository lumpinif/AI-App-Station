"use client"

import { useState } from "react"
import { Loader } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

const GoogleLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignInClick = async () => {
    setIsLoading(true)

    // const signInResult = await signIn("google", {
    //   callbackUrl: `${window.location.origin}`,
    // })

    if ("!signInResult?.ok") {
      console.log("signInResult")
      setIsLoading(false)
      return toast.error("Something went wrong.", {
        description: "Please try again later.",
        duration: 5000,
      })
    }
  }

  return (
    <Button onClick={handleSignInClick}>
      Continue with Google
      <FcGoogle className="ml-4 h-5 w-5" />
      {isLoading && <Loader className="ml-4 animate-spin" />}
    </Button>
  )
}

export default GoogleLoginButton
