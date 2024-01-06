"use client"

import React from "react"
import { useRouter } from "next/navigation"

import { Icons } from "../icons/icons"
import { Button } from "../ui/button"

const SignInPageHeader = () => {
  const route = useRouter()
  return (
    <header className="relative p-4 sm:px-8">
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

export default SignInPageHeader
