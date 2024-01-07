"use client"

import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { ImSpinner3 } from "react-icons/im"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

const GoogleLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignInClick = async () => {
    setIsLoading(true)

    // const signInResult = await signIn("google", {
    //   callbackUrl: `${window.location.origin}`,
    // })
    console.log("Google Sign In Clicked")

    // if ("!signInResult?.ok") {
    //   return toast.error("Something went wrong.", {
    //     description: "Please try again later.",
    //     duration: 5000,
    //   })
    // }
  }

  return (
    <Button
      onClick={handleSignInClick}
      className="rounded-full"
      disabled={isLoading}
    >
      {isLoading && <ImSpinner3 className="mr-2 h-4 w-4 animate-spin" />}
      Continue with Google
      <FcGoogle className="ml-4 h-5 w-5" />
    </Button>
  )
}

export default GoogleLoginButton
