"use client"

import { SetStateAction, useState } from "react"
import { ImSpinner3 } from "react-icons/im"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import { InputBorderSpotlight } from "../shared/InputBorderSpotlight"

const EmailLoginForm = () => {
  const [email, setEmail] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSignInWithEmail() {
    setIsLoading(true)
    // const signInResult = await signIn("email", {
    //   email: email,
    //   callbackUrl: `${window.location.origin}`,
    // })
    console.log("Email Sign In Clicked")
    setIsLoading(false)

    if ("!signInResult?.ok") {
      return toast.error("Something went wrong.", {
        description: "Please try again later.",
        duration: 5000,
        action: {
          label: "Close",
          onClick: () => {
            toast.dismiss()
          },
        },
      })
    }

    if ("signInResult?.ok") {
      console.log({ email })
      return toast.success("Check your email", {
        description: "We sent you an email with login instructions.",
      })
    }
  }

  return (
    <form action={handleSignInWithEmail}>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <InputBorderSpotlight
          name="email"
          type="email"
          id="email"
          placeholder="Enter your email here to receive a magic link"
          onChange={(e: { target: { value: SetStateAction<string | null> } }) =>
            setEmail(e.target.value)
          }
        />
        <Button
          className="mt-4 rounded-full"
          type="submit"
          disabled={isLoading}
          onClick={() => setIsLoading(true)}
        >
          {isLoading && <ImSpinner3 className="mr-2 h-4 w-4 animate-spin" />}
          Login with Email
        </Button>
      </div>
    </form>
  )
}

export default EmailLoginForm
