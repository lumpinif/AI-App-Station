import { getUser } from "@/server/auth"

import AccountModal from "@/components/auth/auth-modal/account-modal"
import { SearchCommandDialogProvider } from "@/components/search-command-dialog/search-command-dialog-provider"
import { AppSubmitModal } from "@/components/submit/app-submit-modal"

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await getUser()

  return (
    <>
      <SearchCommandDialogProvider />
      <AccountModal user={user} />
      <AppSubmitModal user={user} />
      {children}
    </>
  )
}
