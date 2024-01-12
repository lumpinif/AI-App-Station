"use client"

import { useRouter } from "next/navigation"

import { Icons } from "../icons/icons"
import { Button } from "../ui/button"

const AuthPageHeader = () => {
  const route = useRouter()
  return (
    <header className="absolute p-4 sm:px-8">
      <Button
        className="h-10 w-10 items-center justify-center rounded-full shadow-outline"
        size={"icon"}
        variant={"ghost"}
        onClick={() => route.back()}
      >
        <Icons.left />
      </Button>
    </header>
  )
}

export default AuthPageHeader
