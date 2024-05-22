import { getUserData } from "@/server/auth"

import AccountModal from "@/components/auth/auth-modal/account-modal"
import { AppSubmitModal } from "@/components/submit/app-submit-modal"

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    data: { user },
    error: getUserError,
  } = await getUserData()

  if (getUserError) {
    console.error(getUserError)
  }

  return (
    <main>
      <AccountModal user={user} />
      <AppSubmitModal user={user} />
      {children}
    </main>
  )
}
