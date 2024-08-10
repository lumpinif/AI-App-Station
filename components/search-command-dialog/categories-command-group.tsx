import React from "react"
import { useRouter } from "next/navigation"

import { AIAPPSPAGENAVROUTES } from "@/config/routes/site-routes"

import { CommandGroup, CommandItem } from "../ui/command"

type AppsCommandGroupProps = {
  runCommand: (command: () => unknown, isToggleSearchDialog?: boolean) => void
}

export const CategoriesCommandGroup: React.FC<AppsCommandGroupProps> = ({
  runCommand,
}) => {
  const router = useRouter()
  return (
    <CommandGroup heading="Categories">
      {AIAPPSPAGENAVROUTES.filter((route) => route.title === "Categories").map(
        (navItem) => (
          <React.Fragment key={navItem.href}>
            {navItem?.items?.map((item) => (
              <CommandItem
                key={item.href}
                keywords={[Object.values(item).join(" ")]}
                value={item.title + item.href}
                onSelect={() => {
                  runCommand(() => router.push(item.href as string))
                }}
              >
                {/* {item.icon && (
                      <>
                        {item.title !== "GPTs" ? (
                          <item.icon className="mr-2 size-full stroke-[1.5]" />
                        ) : (cre
                          <item.icon className="mr-2" size={26} />
                        )}
                      </>
                    )} */}
                {/* <LucideIcon name={item.title} /> */}
                {item.title}
              </CommandItem>
            ))}
          </React.Fragment>
        )
      )}
    </CommandGroup>
  )
}
