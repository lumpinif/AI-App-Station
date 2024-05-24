"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "@/server/auth"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import useAccountModal from "@/hooks/use-account-modal-store"
import { ButtonProps } from "@/components/ui/button"
import { SpinnerButton } from "@/components/shared/spinner-button"

type SignOutButtonProps = ButtonProps & {
  className?: string
}

const SignOutButton = ({ className, ...props }: SignOutButtonProps) => {
  const closeAccountModal = useAccountModal((state) => state.closeModal)
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
          closeAccountModal()
        } else {
          toast.error("You need to Sign In first.")
          router.push("/signin")
        }
      } catch (error) {
        console.error(error)
        toast.error("Failed to Sign Out!")
      }
      // TODO: HANDLE REDIRECT FOR THE PROTECTED PATH
      // if (pathname === "/user") {
      //   router.replace("/auth?next=" + pathname)
      // }
    })
  }

  return (
    <form action={handleSignOut}>
      <SpinnerButton
        type="submit"
        isLoading={isPending}
        className={cn("w-full active:scale-[0.98]", className)}
        {...props}
      >
        Sign Out
      </SpinnerButton>
    </form>
  )
}

export default SignOutButton
