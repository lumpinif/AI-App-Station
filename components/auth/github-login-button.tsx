"use client"

import { useState } from "react"
import { GithubIcon } from "lucide-react"
import { ImSpinner3 } from "react-icons/im"

import { Button } from "@/components/ui/button"

const GithubLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignInClick = async () => {
    setIsLoading(true)

    // const signInResult = await signIn("github", {
    //   callbackUrl: `${window.location.origin}`,
    // })
    console.log("Github Sign In Clicked")

    // if (!signInResult?.ok) {
    //   setIsLoading(false);
    //   return toast.error("Something went wrong.", {
    //     description: "Please try again later.",
    //     duration: 5000,
    //   });
    // } else {
    //   return toast.success("You are logged in.", {
    //     description: "Welcome back!",
    //     duration: 5000,
    //   });
    // }
  }

  return (
    <Button
      onClick={handleSignInClick}
      className="rounded-full"
      disabled={isLoading}
    >
      {isLoading && <ImSpinner3 className="mr-2 h-4 w-4 animate-spin" />}
      Continue with Github
      <GithubIcon className="ml-4 h-5 w-5" />
    </Button>
  )
}

export default GithubLoginButton
