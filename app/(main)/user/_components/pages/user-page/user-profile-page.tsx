import React from "react"
import { Construction } from "lucide-react"

import { InDevNotice } from "@/components/shared/in-dev-notice"

import { UserProfileCard } from "./user-profile-card"

type UserPage = {}

export const UserProfilePage: React.FC<UserPage> = ({}) => {
  return (
    <section className="flex w-full flex-col sm:gap-4 sm:py-4">
      {/* Main */}
      <main className="grid flex-1 items-start gap-8 sm:gap-10 md:gap-16">
        <UserProfileCard className="mx-auto w-full md:max-w-xl lg:max-w-2xl" />
      </main>

      <InDevNotice
        title="Public User Page"
        className="mx-auto flex h-96 flex-col items-center justify-center gap-x-4 gap-y-6 text-balance py-20 text-center text-xl text-muted-foreground sm:flex-row"
      />
    </section>
  )
}
