import React from "react"
import { useRouter } from "next/navigation"

import { AIAPPSPAGENAVROUTES } from "@/config/routes/site-routes"

import { CommandGroup, CommandItem } from "../ui/command"

type CollectionsCommandGroupProps = {
  runCommand: (command: () => unknown, isToggleSearchDialog?: boolean) => void
}

export const CollectionsCommandGroup: React.FC<
  CollectionsCommandGroupProps
> = ({ runCommand }) => {
  const router = useRouter()
  return (
    <CommandGroup heading="Collections">
      {AIAPPSPAGENAVROUTES.filter((route) => route.title === "Collections").map(
        (navItem) => (
          <React.Fragment key={navItem.href}>
            {navItem?.items?.map((item) => (
              <CommandItem
                key={item.href}
                // keywords={[Object.values(item).join(" ")]}
                value={item.title + item.href}
                onSelect={() => {
                  runCommand(() => router.push(item.href as string))
                }}
              >
                {item.icon && (
                  <>
                    {item.title !== "GPTs" ? (
                      <item.icon className="mr-2 size-full stroke-[1.5] text-muted-foreground md:mr-4" />
                    ) : (
                      <item.icon
                        className="mr-2 text-muted-foreground md:mr-4"
                        size={26}
                      />
                    )}
                  </>
                )}
                {item.title}
              </CommandItem>
            ))}
          </React.Fragment>
        )
      )}
    </CommandGroup>
  )
}
