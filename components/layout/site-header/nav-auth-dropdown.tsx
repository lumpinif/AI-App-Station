"use client"

import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import useUserProfile from "@/hooks/react-hooks/use-user"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NavigationMenuItem } from "@/components/ui/navigation-menu"
import AccountModalContent from "@/components/auth/auth-modal/account-modal-content"
import AccountModalTrigger from "@/components/auth/auth-modal/account-modal-trigger"

const NavAuthDropdown = () => {
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
        <DropdownMenu modal={false}>
          <NavigationMenuItem
            className={cn(
              "active:shadow-inner-outlin inline-flex animate-fade-up rounded-full hover:bg-foreground/10"
            )}
          >
            <DropdownMenuTrigger className="size-fit rounded-full outline-none focus:!ring-0 focus:!ring-transparent">
              <AccountModalTrigger
                isTriggerModal={false}
                avatarClassName="size-7 hover:cursor-pointer active:scale-[.98] "
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={20}
              alignOffset={-10}
              className="rounded-xl bg-background/85 p-4 text-popover-foreground shadow-lg backdrop-blur-2xl dark:border-0 dark:bg-[#323232] dark:shadow-outline md:w-[400px] lg:w-[500px]"
            >
              <AccountModalContent />
            </DropdownMenuContent>
          </NavigationMenuItem>
        </DropdownMenu>
      ) : null}
    </>
  )
}

export default NavAuthDropdown
