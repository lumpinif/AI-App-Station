"use client"

import { useState } from "react"
import { GithubIcon, Loader } from "lucide-react"

import { Button } from "@/components/ui/button"

const GithubLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignInClick = async () => {
    setIsLoading(true)

    // const signInResult = await signIn("github", {
    //   callbackUrl: `${window.location.origin}`,
    // })
    console.log("signInResult")

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
    <Button onClick={handleSignInClick}>
      Continue with Github
      <GithubIcon className="ml-4 h-5 w-5" />
      {isLoading && <Loader className="ml-4 animate-spin" />}
    </Button>
  )
}

export default GithubLoginButton
