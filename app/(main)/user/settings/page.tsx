import { Suspense } from "react"

import { Separator } from "@/components/ui/separator"
import AccountModalTrigger from "@/components/auth/auth-modal/account-modal-trigger"
import { SidebarNav } from "@/components/auth/settings/layout/sidebar-nav"
import UserNameEmail from "@/components/auth/settings/layout/user-name-email"
import { ProfileForm } from "@/components/auth/settings/profile/profile-form"

import { UserPagesWrapper } from "../_components/layout/user-pages-wrapper"
import Loading from "./loading"

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings/profile",
  },
  {
    title: "Account",
    href: "/settings/account",
  },
]

export default function SettingsProfilePage() {
  return (
    <div>
      <div className="flex flex-col justify-start space-y-6 md:space-y-8 xl:space-y-10">
        <AccountModalTrigger
          isTriggerModal={false}
          className="size-10 sm:size-32"
        />
      </div>
      <Separator className="my-6" />
      <UserNameEmail />
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/6">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <Suspense fallback={<Loading />}>
            {" "}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-muted-foreground text-sm">
                  This is how others will see you on the site.
                </p>
              </div>
              <Separator />
              <ProfileForm />
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  )
}
