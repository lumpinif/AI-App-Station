import { ReactNode } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getUserData, signOut } from "@/utils/supabase/actions/auth"

// import { PlusIcon } from "@radix-ui/react-icons"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import UserNavHeading from "./user-nav-heading"
import UserSideNav from "./user-side-nav"

interface UserMainLayoutProps {
  children: ReactNode
}

export default async function UserMainLayout({
  children,
}: UserMainLayoutProps) {
  const {
    data: { user },
  } = await getUserData()

  const handleSignOut = async () => {
    "use server"

    await signOut()
    return redirect("/login")
  }

  // if (!user) {
  //   return redirect("/login")
  // }

  return (
    <main className="flex">
      <UserSideNav />
      <section className="w-full">
        <header className="fixed left-60 right-0 z-10 border-b p-3">
          <div className="container flex items-center justify-between">
            <div>
              <UserNavHeading />
            </div>
            <div className="flex justify-center gap-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"outline"}>Create</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                  <Link href={"/admin/projects/create"}>
                    <DropdownMenuItem className="cursor-pointer text-gray-500">
                      Project
                    </DropdownMenuItem>
                  </Link>
                  <Link href={"/admin/blogs/create"}>
                    <DropdownMenuItem className="cursor-pointer text-gray-500">
                      Blog
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>
                      {user?.email && user.email[0]}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuItem className="text-gray-500">
                    {/* {user.email} */}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <form action={handleSignOut}>
                    <button className="bg-btn-background block w-full rounded-md px-2 py-2 text-left text-sm no-underline hover:bg-gray-100">
                      Logout
                    </button>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <div className="absolute bottom-0 left-60 right-5 top-24">
          <div className="container">{children}</div>
        </div>
      </section>
    </main>
  )

  // return user ? (
  //   <div className="flex items-center gap-4">
  //     Hey, {user.email}!
  //     <form action={signOut}>
  //       <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
  //         Logout
  //       </button>
  //     </form>
  //   </div>
  // ) : (
  //   <Link
  //     href="/login"
  //     className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
  //   >
  //     Login
  //   </Link>
  // )
}
