"use client"

import { UserProfileCard } from "./user-profile-card"

type UserPageLayoutProps = {}

export const UserPageLayout: React.FC<UserPageLayoutProps> = ({}) => {
  return (
    <section className="flex w-full flex-col sm:gap-4 sm:py-4">
      {/* Main */}
      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
        <UserProfileCard />
      </main>
    </section>
  )
}
