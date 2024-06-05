"use client"

import { usePathname } from "next/navigation"

import useUserProfile from "@/hooks/react-hooks/use-user"
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import AccountModalContent from "@/components/auth/auth-modal/account-modal-content"
import AccountModalTrigger from "@/components/auth/auth-modal/account-modal-trigger"

const NavMenuAuthDropdown = () => {
  const currentPath = usePathname()
  const { data: profile } = useUserProfile()

  if (!profile?.user_id && currentPath !== "/ai-apps") {
    return (
      <>
        <NavigationMenuItem className="rounded-full">
          <AccountModalTrigger avatarClassName="size-7" />
        </NavigationMenuItem>
      </>
    )
  }

  return (
    <>
      {currentPath !== "/ai-apps" ? (
        <NavigationMenuItem className="animate-fade-up rounded-full">
          <NavigationMenuTrigger withChevron={false}>
            <AccountModalTrigger
              avatarClassName="size-7"
              isTriggerModal={false}
            />
            <NavigationMenuContent>
              <ul className="p-4 md:w-[400px] lg:w-[500px]">
                <AccountModalContent />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuTrigger>
        </NavigationMenuItem>
      ) : null}
    </>
  )
}

export default NavMenuAuthDropdown
