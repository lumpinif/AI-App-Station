import React from "react"
import { useRouter } from "next/navigation"
import { LaptopIcon, MoonIcon, Plus, SunIcon, Upload } from "lucide-react"
import { useTheme } from "next-themes"

import { MAINROUTES, SIDENAVROUTES } from "@/config/routes/main-routes"
import useAccountModal from "@/hooks/use-account-modal-store"
import useNewStory from "@/hooks/use-new-story"
import useSearchDialogStore from "@/hooks/use-search-dialog-store"
import useSubmitApp from "@/hooks/use-submit-app"

import { SpinnerButton } from "../shared/spinner-button"
import { CommandGroup, CommandItem, CommandSeparator } from "../ui/command"

type SearchCommandGroupsProps = {
  runCommand: (callback: () => unknown, isToggleSearchDialog?: boolean) => void
}

export const SearchCommandGroups: React.FC<SearchCommandGroupsProps> = ({
  runCommand,
}) => {
  const router = useRouter()
  const { setTheme } = useTheme()
  const openAccountModal = useAccountModal((state) => state.openModal)

  const toggleSearchDialog = useSearchDialogStore(
    (state) => state.toggleSearchDialog
  )

  const { handleAppSubmitButtonClick } = useSubmitApp()
  const { handleCreateNewStory, isLoading, isUserLogged } =
    useNewStory(toggleSearchDialog)

  return (
    <>
      <CommandGroup heading="Projects">
        <CommandItem
          value="new app submit"
          keywords={["submit new app", "submit app"]}
          onSelect={() => {
            runCommand(() => handleAppSubmitButtonClick())
          }}
          className="hover:cursor-pointer"
        >
          <Upload className="mr-2 size-4 stroke-[1.5px]" />
          Submit New App
        </CommandItem>

        <CommandItem
          className="!p-0"
          value="write new story"
          keywords={["create new story", "write new story"]}
          onSelect={() => {
            runCommand(() => {
              isUserLogged ? handleCreateNewStory() : openAccountModal()
            }, false)
          }}
        >
          <SpinnerButton
            isLoading={isLoading}
            variant={"ghost"}
            className="h-11 w-full !px-2 hover:bg-transparent"
            motionClassName="justify-start space-x-0"
          >
            <Plus className="mr-2 h-4 w-4" />
            <span className="font-normal">Create New Story</span>
          </SpinnerButton>
        </CommandItem>
      </CommandGroup>

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
                <navItem.icon className="mr-2 size-4 stroke-[1.5px]" />
              )}
              {navItem.title}
            </CommandItem>
          ))}
      </CommandGroup>

      <CommandSeparator />

      <CommandGroup heading="Collections">
        {SIDENAVROUTES.filter((route) => route.title === "Collections").map(
          (navItem) => (
            <React.Fragment key={navItem.href}>
              {navItem.items.map((item) => (
                <CommandItem
                  key={item.href}
                  // keywords={[Object.values(item).join(" ")]}
                  value={item.title}
                  onSelect={() => {
                    runCommand(() => router.push(item.href as string))
                  }}
                >
                  {item.icon && (
                    <>
                      {item.title !== "GPTs" ? (
                        <item.icon className="mr-2 size-full stroke-[1.5]" />
                      ) : (
                        <item.icon className="mr-2" size={26} />
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

      <CommandSeparator />

      <CommandGroup heading="Categories">
        {SIDENAVROUTES.filter((route) => route.title === "Categories").map(
          (navItem) => (
            <React.Fragment key={navItem.href}>
              {navItem.items.map((item) => (
                <CommandItem
                  key={item.href}
                  keywords={[Object.values(item).join(" ")]}
                  value={item.title}
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

      <CommandSeparator />

      <CommandGroup heading="Theme">
        <CommandItem onSelect={() => setTheme("light")}>
          <SunIcon className="mr-2 h-4 w-4" />
          Light
        </CommandItem>
        <CommandItem onSelect={() => setTheme("dark")}>
          <MoonIcon className="mr-2 h-4 w-4" />
          Dark
        </CommandItem>
        <CommandItem onSelect={() => setTheme("system")}>
          <LaptopIcon className="mr-2 h-4 w-4" />
          System
        </CommandItem>
      </CommandGroup>
    </>
  )
}
