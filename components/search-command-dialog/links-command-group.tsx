import { useRouter } from "next/navigation"

import { MAINROUTES } from "@/config/routes/main-routes"

import { CommandGroup, CommandItem } from "../ui/command"

type LinksCommandGroupProps = {
  runCommand: (command: () => unknown, isToggleSearchDialog?: boolean) => void
}

export const LinksCommandGroup: React.FC<LinksCommandGroupProps> = ({
  runCommand,
}) => {
  const router = useRouter()
  return (
    <CommandGroup heading="Links">
      {MAINROUTES.filter(
        (route) =>
          route.id !== "search" &&
          route.id !== "create story" &&
          route.id !== "submit"
      )
        .sort((a, b) =>
          String(a.shortcutNumber!).localeCompare(String(b.shortcutNumber!))
        )
        .map((navItem) => (
          <CommandItem
            key={navItem.href}
            keywords={[Object.values(navItem).join(" ")]}
            value={navItem.title}
            onSelect={() => {
              runCommand(() => router.push(navItem.href as string))
            }}
          >
            {navItem.icon && (
              <navItem.icon className="mr-2 size-4 stroke-[1.5px] text-muted-foreground md:mr-4" />
            )}
            {navItem.title}
          </CommandItem>
        ))}
    </CommandGroup>
  )
}
