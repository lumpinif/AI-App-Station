import { memo, useCallback, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ChevronDown, ChevronRight } from "lucide-react"

import { User_role } from "@/types/db_tables"
import { NavItemProps } from "@/config/routes/site-routes"
import { cn } from "@/lib/utils"
import useUserProfile from "@/hooks/react-hooks/use-user"
import { useKeyPress } from "@/hooks/use-key-press"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { isEditorRoute } from "@/app/(main)/user/_components/layout/user-pages-breadcrumb"

import {
  iconCN,
  linkItemCN,
  linkItemTextCN,
} from "./pinnable-side-menu-nav-links"

type SecondaryNavLinksProps = {
  isOpen?: boolean
  routes: NavItemProps[]
  basePath: string
  enableShortcuts?: boolean
}

const CollapsibleItemCN =
  "flex w-full items-center rounded-md px-2 py-1 transition-all duration-200 ease-in-out hover:text-blue-400 hover:underline  dark:hover:no-underline dark:hover:shadow-outline"

export const SecondaryNavLinks: React.FC<SecondaryNavLinksProps> = memo(
  ({ isOpen, routes, basePath, enableShortcuts = true }) => {
    const router = useRouter()
    const currentPath = usePathname()

    const isCurrentRoute = currentPath.startsWith(basePath)
    const inEditorRoute = isEditorRoute(currentPath)

    const flattenRoutes = useCallback(
      (routes: NavItemProps[]): NavItemProps[] => {
        return routes.reduce((acc, route) => {
          if (route.shortcutNumber) {
            acc.push(route)
          }
          if (route.items) {
            acc.push(...flattenRoutes(route.items))
          }
          return acc
        }, [] as NavItemProps[])
      },
      []
    )

    const handleKeyPress = useCallback(
      (event: KeyboardEvent) => {
        if (isOpen && isCurrentRoute && enableShortcuts && !inEditorRoute) {
          const pressedKey = event.code
          const flattenedRoutes = flattenRoutes(routes)
          const matchingItem = flattenedRoutes.find(
            (item) => `Digit${item.shortcutNumber}` === pressedKey
          )

          if (matchingItem) {
            router.push(matchingItem.href)
          }
        }
      },
      [
        isOpen,
        isCurrentRoute,
        enableShortcuts,
        inEditorRoute,
        flattenRoutes,
        routes,
        router,
      ]
    )

    useKeyPress({
      callback: handleKeyPress,
      keyCodes: ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6"],
    })

    if (!isCurrentRoute) return null

    return (
      <>
        <Separator className={cn(isOpen ? "bg-muted" : "opacity-50")} />

        <div className="flex h-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden pr-0.5">
          {routes.map((item, index) => (
            <div key={index}>
              {item.items ? (
                <CollapsibleNav
                  item={item}
                  isOpen={isOpen}
                  currentPath={currentPath}
                >
                  <CollapsibleItems
                    isOpen={isOpen}
                    items={item.items}
                    currentPath={currentPath}
                  />
                </CollapsibleNav>
              ) : (
                <SingleNavItem
                  item={item}
                  isOpen={isOpen}
                  currentPath={currentPath}
                  isEditorRoute={inEditorRoute}
                />
              )}
            </div>
          ))}
        </div>
      </>
    )
  }
)

SecondaryNavLinks.displayName = "SecondaryNavLinks"

type SingleNavItemProps = {
  item: NavItemProps
  isOpen?: boolean
  currentPath: string
  isEditorRoute?: boolean
}

const SingleNavItem: React.FC<SingleNavItemProps> = memo(
  ({ item, isOpen, currentPath, isEditorRoute }) => {
    const { data: profile } = useUserProfile()

    const userRole = profile?.profile_role?.role

    const isAllowed = item.roleAllowed?.includes(userRole as User_role)

    if (item.roleAllowed && !isAllowed) return null

    return (
      <Link
        href={item.href}
        className={cn(
          linkItemCN,
          !isOpen && "justify-center",
          currentPath === item.href
            ? "bg-muted text-primary dark:shadow-outline"
            : "text-muted-foreground"
        )}
      >
        {item.icon && (
          <item.icon className={cn("shrink-0 stroke-[1.5]", iconCN)} />
        )}

        <span className={cn(linkItemTextCN, !isOpen ? "scale-0" : "scale-100")}>
          {item.fullTitle ?? item.title}
        </span>
        {item.shortcutNumber && !isEditorRoute && isOpen && (
          <kbd className="pointer-events-none flex h-5 w-5 select-none items-center justify-center rounded bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 dark:bg-muted-foreground/30">
            <span className="text-xs">{item.shortcutNumber}</span>
          </kbd>
        )}
        {item.label && isOpen && (
          <span className="rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-black no-underline group-hover:no-underline">
            {item.label}
          </span>
        )}
      </Link>
    )
  }
)

SingleNavItem.displayName = "SingleNavItem"

type CollapsibleItemsProps = {
  isOpen?: boolean
  currentPath: string
  items: NavItemProps[]
}

export const CollapsibleItems: React.FC<CollapsibleItemsProps> = memo(
  ({ items, isOpen, currentPath }) => {
    return (
      <>
        <div className="flex flex-col gap-y-2">
          {items.map((item, index) =>
            item.href && !item.disabled ? (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  CollapsibleItemCN,
                  currentPath === item.href
                    ? "bg-muted text-primary dark:shadow-outline"
                    : "text-muted-foreground"
                )}
              >
                <CItem item={item} />
              </Link>
            ) : (
              <span
                key={index}
                className={cn(
                  CollapsibleItemCN,
                  item.disabled && "cursor-not-allowed opacity-60"
                )}
              >
                <CItem item={item} />
              </span>
            )
          )}
        </div>
      </>
    )
  }
)

CollapsibleItems.displayName = "CollapsibleItems"

type CItemProps = {
  item: NavItemProps
}

export const CItem: React.FC<CItemProps> = memo(({ item }) => {
  return (
    <div className="flex w-full items-center justify-between gap-x-2">
      <div className="flex items-center gap-2">
        {item.icon && (
          <div className="flex h-5 w-5 items-center group-hover:text-foreground">
            {item.title !== "GPTs" ? (
              <item.icon className="size-full stroke-[1.5]" />
            ) : (
              <item.icon size={26} />
            )}
          </div>
        )}
        <div>{item.title}</div>
      </div>

      {item.shortcutNumber && (
        <kbd className="pointer-events-none flex h-5 w-5 select-none items-center justify-center rounded bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 dark:bg-muted-foreground/30">
          <span className="text-xs">{item.shortcutNumber}</span>
        </kbd>
      )}

      {item.label && (
        <span className="rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-black no-underline group-hover:no-underline">
          {item.label}
        </span>
      )}
    </div>
  )
})

CItem.displayName = "CItem"

type CollapsibleNavProps = React.PropsWithChildren<{
  item: NavItemProps
  isOpen?: boolean
  currentPath: string
}>

export const CollapsibleNav: React.FC<CollapsibleNavProps> = memo(
  ({ item, isOpen, children, currentPath }) => {
    const [isCollapsible, setIsCollapsible] = useState(true)

    const linkCN = cn(
      currentPath.startsWith(item.href) && "text-blue-500 font-medium"
    )

    const handleToggleCollapsible = () => {
      setIsCollapsible(!isCollapsible)
    }

    return (
      <Collapsible
        open={isCollapsible && isOpen}
        onOpenChange={setIsCollapsible}
      >
        <div className={cn(linkItemCN, linkCN, !isOpen && "justify-center")}>
          <CollapsibleTrigger asChild>
            <button className={cn(linkCN)}>
              {item.icon && <item.icon className={cn(iconCN, linkCN)} />}
              <span className="sr-only">{item.title}</span>
            </button>
          </CollapsibleTrigger>
          {isOpen && (
            <div className="flex w-full items-center justify-between">
              <Link
                href={item.href}
                className={cn("underline-offset-4 hover:underline")}
              >
                {item.title}
              </Link>
              <div
                onClick={handleToggleCollapsible}
                className={cn(
                  "rounded-full hover:cursor-pointer",
                  isCollapsible
                    ? "bg-muted/20"
                    : "bg-muted/20 text-muted-foreground"
                )}
              >
                {!isCollapsible ? (
                  <ChevronRight className="stroke-[1.5]" />
                ) : (
                  <ChevronDown />
                )}
              </div>
            </div>
          )}
        </div>
        <CollapsibleContent className="p-1">{children}</CollapsibleContent>
      </Collapsible>
    )
  }
)

CollapsibleNav.displayName = "CollapsibleNav"
