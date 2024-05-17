import React from "react"
import Link from "next/link"
import { Separator } from "@radix-ui/react-dropdown-menu"

import { userLayoutRoutes } from "@/config/routes/user-layout-routes"

import { UserProfileCard } from "./user-profile-card"

type UserPageLayoutProps = {}

export const UserPageLayout: React.FC<UserPageLayoutProps> = ({}) => {
  return (
    <section className="flex w-full flex-col sm:gap-4 sm:py-4">
      {/* Main */}
      <main className="grid flex-1 items-start gap-8 sm:gap-10 md:gap-16">
        <UserProfileCard className="mx-auto w-full md:max-w-xl lg:max-w-2xl" />
      </main>
    </section>
  )
}

function UserPageLinks() {
  return (
    <>
      <div className="mx-auto flex w-full max-w-5xl items-center gap-4 text-xl font-normal">
        <Link href={"/user/favorites"}>
          <span>Favorites</span>
          <span className="sr-only">Favorites</span>
        </Link>
      </div>

      <div className="mx-auto flex w-full max-w-5xl items-center gap-4 text-xl font-normal">
        <Link
          href={"/user/bookmarks"}
          className="mx-auto flex w-full max-w-5xl items-center gap-4 text-xl font-normal"
        >
          <span>Bookmarks</span>
          <span className="sr-only">Bookmarks</span>
        </Link>
      </div>

      <div className="mx-auto flex w-full max-w-5xl items-center gap-4 text-xl font-normal">
        <Link
          href={"/user/apps"}
          className="mx-auto flex w-full max-w-5xl items-center gap-4 text-xl font-normal"
        >
          <span>Submitted</span>
          <span className="sr-only">Submitted</span>
        </Link>
      </div>

      <div className="mx-auto flex w-full max-w-5xl items-center gap-4 text-xl font-normal">
        <Link
          href={"/user/posts"}
          className="mx-auto flex w-full max-w-5xl items-center gap-4 text-xl font-normal"
        >
          <span>Posts</span>
          <span className="sr-only">Posts</span>
        </Link>
      </div>
    </>
  )
}
