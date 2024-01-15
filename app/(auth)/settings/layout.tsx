import { Metadata } from "next"
import { redirect } from "next/navigation"

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/auth/settings/sidebar-nav"

import { getUserData, getUserSession } from "../auth-actions"

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
}

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

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  const {
    data: { user },
  } = await getUserData()

  const {
    data: { session },
  } = await getUserSession()

  if (!session && !user) {
    return redirect("/signin")
  }

  return (
    <>
      <div className="mb-10 sm:container">
        <div className="w-full space-y-6 rounded-3xl p-10 pb-16 shadow-outline sm:mx-4">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
              Manage your profile and account preferences.
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/6">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}
