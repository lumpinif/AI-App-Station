/* eslint-disable tailwindcss/no-unnecessary-arbitrary-value */
"use client"

import * as React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LaptopIcon, MoonIcon, Plus, SunIcon, Upload } from "lucide-react"
import { useTheme } from "next-themes"

import { MAINROUTES, SIDENAVROUTES } from "@/config/routes/main-routes"
import useAccountModal from "@/hooks/use-account-modal-store"
import useNewStory from "@/hooks/use-new-story"
import useSearchDialogStore from "@/hooks/use-search-dialog-store"
import useSubmitApp from "@/hooks/use-submit-app"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

import { ScrollArea } from "../ui/scroll-area"
import { SpinnerButton } from "./spinner-button"

export function SearchCommandDialogProvider() {
  const [search, setSearch] = React.useState("")
  const router = useRouter()

  const isOpen = useSearchDialogStore((state) => state.isOpen)

  const openAccountModal = useAccountModal((state) => state.openModal)

  const toggleSearchDialog = useSearchDialogStore(
    (state) => state.toggleSearchDialog
  )

  const { handleAppSubmitButtonClick } = useSubmitApp()
  const { handleCreateNewStory, isLoading, isUserLogged } =
    useNewStory(toggleSearchDialog)

  const { setTheme } = useTheme()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }
        e.preventDefault()
        toggleSearchDialog()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const runCommand = React.useCallback(
    (command: () => unknown, isToggleSearchDialog: boolean = true) => {
      if (isToggleSearchDialog) toggleSearchDialog()
      command()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <CommandDialog
      open={isOpen}
      onOpenChange={toggleSearchDialog}
      commandClassName="bg-background"
      className="data-[state=closed]:max-md:slide-out-to-bottom-5 data-[state=open]:max-md:!slide-in-from-bottom-5 h-[calc(100vh-3rem)] max-w-full rounded-2xl p-4 py-6 sm:max-w-lg sm:rounded-3xl md:top-1/3 md:h-[720px] md:max-w-xl lg:max-w-2xl xl:max-w-3xl"
    >
      <div className="[&_[cmdk-input-wrapper]]:bg-muted mb-2 p-3 [&_[cmdk-input-wrapper]]:rounded-full [&_[cmdk-input-wrapper]]:border-none">
        <CommandInput
          placeholder="Type a command or search..."
          onValueChange={setSearch}
        />
      </div>

      <section className="flex size-full overflow-hidden">
        <ScrollArea className="w-full">
          <CommandList className="relative size-full !max-h-none pr-2 md:px-4">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Projects">
              <CommandItem
                value="new app submit"
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
              ).map((navItem) => (
                <CommandItem
                  key={navItem.href}
                  value={navItem.href + Object.values(navItem).join("")}
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
              {SIDENAVROUTES.filter(
                (route) => route.title === "Collections"
              ).map((navItem) => (
                <React.Fragment key={navItem.href}>
                  {navItem.items.map((item) => (
                    <CommandItem
                      key={item.href}
                      value={item.href + Object.values(item).join("")}
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
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Categories">
              {SIDENAVROUTES.filter(
                (route) => route.title === "Categories"
              ).map((navItem) => (
                <React.Fragment key={navItem.href}>
                  {navItem.items.map((item) => (
                    <CommandItem
                      key={item.href}
                      value={item.href + Object.values(item).join("")}
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
              ))}
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
          </CommandList>
        </ScrollArea>
      </section>
    </CommandDialog>
  )
}
