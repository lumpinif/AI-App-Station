import { UserPagesTitle } from "./_components/layout/user-pages-title"
import { UserProfilePage } from "./_components/pages/user-page/user-profile-page"

export default async function UserPage() {
  return (
    <div>
      <UserPagesTitle className="text-2xl font-semibold sm:text-3xl md:text-4xl" />

      <UserProfilePage />
    </div>
  )
}
