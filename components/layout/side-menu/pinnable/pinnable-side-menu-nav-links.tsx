import React, { memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Profiles } from "@/types/db_tables"
import {
  AIAPPSPAGENAVROUTES,
  MAINROUTES,
  NavItemProps,
  USERPAGESNAVROUTES,
} from "@/config/routes/site-routes"
import { cn } from "@/lib/utils"
import useUserProfile from "@/hooks/react-hooks/use-user"
import useAccountModal from "@/hooks/use-account-modal-store"
import useSideMenu from "@/hooks/use-side-menu"
import PopoverMenu from "@/components/ui/popover-menu"
import AccountModalTrigger from "@/components/auth/auth-modal/account-modal-trigger"
import { SignInTrigger } from "@/components/auth/signin/sign-in-trigger"

import { SecondaryNavLinks } from "./secondary-nav-links"

type PinnableSideMenuNavLinksPropsProps = {
  isPinned: boolean
}

export const iconCN = "text-muted-foreground size-7 group-hover:text-blue-400"

export const linkItemCN =
  "group flex items-center gap-x-4 rounded-xl p-2 hover:cursor-pointer text-muted-foreground hover:text-blue-400 transition-all duration-300 ease-out select-none justify-center md:justify-start"

export const linkItemTextCN =
  "flex-1 origin-left text-nowrap transition-all duration-300 ease-out group-hover:text-blue-400"

export const PinnableSideMenuNavLinks: React.FC<PinnableSideMenuNavLinksPropsProps> =
  memo(({ isPinned }) => {
    const isOpen = useSideMenu((state) => state.isOpen)
    const { data: profile } = useUserProfile()

    return (
      <nav
        className={cn(
          "flex flex-1 flex-col gap-y-6 overflow-y-auto overflow-x-hidden rounded-2xl p-4",
          isPinned ? "border bg-background dark:border-none" : ""
        )}
      >
        {MAINROUTES.filter((route) => route.inMainNav).map((route) => (
          <React.Fragment key={route.id}>
            {route.id !== "user" ? (
              <NavLink route={route} profile={profile} isOpen={isOpen} />
            ) : (
              <ProfileLink
                route={route}
                isOpen={isOpen}
                profile={profile}
                isPinned={isPinned}
              />
            )}
          </React.Fragment>
        ))}

        <PopoverMenu isOpen={isOpen} buttonClassName="left-0" />

        <SecondaryNavLinks
          isOpen={isOpen}
          basePath="/ai-apps"
          routes={AIAPPSPAGENAVROUTES}
        />

        <SecondaryNavLinks
          isOpen={isOpen}
          basePath="/user"
          routes={USERPAGESNAVROUTES}
        />
      </nav>
    )
  })

PinnableSideMenuNavLinks.displayName = "PinnableSideMenuNavLinks"

type NavLinkProps = {
  route: NavItemProps
  profile?: Profiles
  isOpen?: boolean
  className?: string
}

const NavLink: React.FC<NavLinkProps> = memo(
  ({ route, isOpen, profile, className }) => {
    const currentPath = usePathname()

    const linkCN = cn(
      currentPath.startsWith(route.href)
        ? "text-blue-500 font-medium"
        : "text-muted-foreground"
    )

    if (route.disabled) {
      return (
        <div
          className={cn(
            linkItemCN,
            linkCN,
            !isOpen && "justify-center",
            className,
            "opacity-50 hover:cursor-not-allowed"
          )}
        >
          {route.id !== "user" ? (
            route.icon && (
              <route.icon
                className={cn("shrink-0 stroke-[1.5]", iconCN, linkCN)}
              />
            )
          ) : (
            <AccountModalTrigger profile={profile} className={cn(iconCN)} />
          )}

          <span
            className={cn(linkItemTextCN, !isOpen ? "scale-0" : "scale-100")}
          >
            {route.fullTitle ?? route.title}
          </span>
        </div>
      )
    }

    return (
      <Link
        href={route.href}
        className={cn(
          linkItemCN,
          linkCN,
          !isOpen && "justify-center",
          className
        )}
      >
        {route.id !== "user" ? (
          route.icon && (
            <route.icon
              className={cn("shrink-0 stroke-[1.5]", iconCN, linkCN)}
            />
          )
        ) : (
          <AccountModalTrigger profile={profile} className={cn(iconCN)} />
        )}

        <span className={cn(linkItemTextCN, !isOpen ? "scale-0" : "scale-100")}>
          {route.fullTitle ?? route.title}
        </span>
      </Link>
    )
  }
)

NavLink.displayName = "NavLink"

type ProfileLinkProps = {
  route: NavItemProps
  profile?: Profiles
  isOpen?: boolean
  isPinned?: boolean
}

const ProfileLink: React.FC<ProfileLinkProps> = memo(
  ({ route, isOpen, profile, isPinned }) => {
    const openModal = useAccountModal((state) => state.openModal)
    const isUserLoggedIn = profile?.user_id

    if (isUserLoggedIn) {
      return <NavLink route={route} profile={profile} isOpen={isOpen} />
    }

    if (isPinned) {
      return (
        <div className="flex flex-col gap-y-2">
          <span className="text-balance text-sm text-muted-foreground">
            Sign in to submit, write, like and comment on AI Apps and stories
          </span>

          <SignInTrigger />
        </div>
      )
    }

    return (
      <div
        onClick={openModal}
        className={cn(linkItemCN, !isOpen && "justify-center")}
      >
        <AccountModalTrigger profile={profile} className={cn(iconCN)} />
        <span className={cn(linkItemTextCN, !isOpen ? "scale-0" : "scale-100")}>
          Sign In for more
        </span>
      </div>
    )
  }
)

ProfileLink.displayName = "ProfileLink"
