"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "@/server/auth"
import { useQueryClient } from "@tanstack/react-query"
import { RingLoader } from "react-spinners"
import { toast } from "sonner"

import { Button } from "../../ui/button"

const SignOutButton = () => {
  const [isPending, startTransition] = useTransition()
  const queryClient = useQueryClient()
  const router = useRouter()

  function handleSignOut() {
    startTransition(async () => {
      try {
        queryClient.clear()
        const result = await signOut()
        if (result !== null) {
          toast.success("Signed Out.")
          router.push("/")
        } else {
          toast.error("You need to Sign In first.")
          router.push("/signin")
        }
      } catch (error) {
        console.error(error)
        toast.error("Failed to Sign Out!")
      }
    })
  }

  return (
    <>
      <form action={handleSignOut}>
        <Button type="submit" disabled={isPending} variant={"destructive"}>
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
