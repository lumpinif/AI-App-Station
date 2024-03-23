"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { useQueryClient } from "@tanstack/react-query"

import { PROTECTED_PATH } from "@/lib/constants"
import useUser from "@/hooks/react-hooks/use-user"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "../ui/button"

export default function Profile() {
  const { isFetching, data } = useUser()
  const queryClient = useQueryClient()
  const router = useRouter()

  const pathname = usePathname()

  if (isFetching) {
    return <></>
  }

  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient()

    queryClient.clear()

    await supabase.auth.signOut()
    router.refresh()

    if (PROTECTED_PATH.includes(pathname)) {
      router.replace("/auth?next=" + pathname)
    }
  }

  return (
    <div>
      {!data?.user_id ? (
        <Link href="/auth" className=" animate-fade">
          <Button variant="outline">SignIn</Button>
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <>
              {data?.avatar_url ? (
                <Image
                  src={data?.avatar_url || ""}
                  alt={data.display_name || ""}
                  width={50}
                  height={50}
                  className="animate-fade cursor-pointer rounded-full ring-2"
                />
              ) : (
                <div className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full text-2xl font-bold ring-2">
                  <h1>{data.email[0]}</h1>
                </div>
              )}
            </>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
