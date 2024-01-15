"use client"

import { useTransition } from "react"
import { RingLoader } from "react-spinners"
import { toast } from "sonner"

import { signOut } from "@/app/(auth)/auth-actions"

import { Button } from "../../ui/button"

const SignOutButton = () => {
  const [isPending, startTransition] = useTransition()

  function handleSignOut() {
    startTransition(async () => {
      const { error } = await signOut()
      if (error) {
        console.error(error)
        toast.error("Failed to Sign Out!")
      }

      toast.success("Signed Out!")
    })
  }

  return (
    <>
      <form action={handleSignOut}>
        <Button type="submit" disabled={isPending}>
          Sign Out
          {isPending && (
            <span className="ml-1">
              <RingLoader size={15} speedMultiplier={1.5} color="gray" />
            </span>
          )}
        </Button>
      </form>
    </>
  )
}

export default SignOutButton
