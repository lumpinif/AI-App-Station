import React from "react"

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
