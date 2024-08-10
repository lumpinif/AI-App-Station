import { getUser } from "@/server/auth"

import AccountModal from "@/components/auth/auth-modal/account-modal"
import MainPageWrapper from "@/components/layout/side-menu/main-page-wrapper"
import { PinnableSideMenu } from "@/components/layout/side-menu/pinnable/pinnable-side-menu"
import PinnableSideMenuContent from "@/components/layout/side-menu/pinnable/pinnable-side-menu-content"
import { SearchCommandDialogProvider } from "@/components/search-command-dialog/search-command-dialog-provider"
import { AppSubmitModal } from "@/components/submit/app-submit-modal"

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await getUser()

  return (
    <div className="flex h-svh flex-col">
      <SearchCommandDialogProvider />
      <AccountModal user={user} />
      <AppSubmitModal user={user} />

      <div className="flex-1 gap-x-2 md:flex md:overflow-hidden md:p-2">
        {/* SideMenu */}
        <PinnableSideMenu>
          <PinnableSideMenuContent />
        </PinnableSideMenu>
        <MainPageWrapper>{children}</MainPageWrapper>
      </div>
      {/* BottomBar */}
      {/* <FloatingSideNav /> */}
    </div>
  )
}
