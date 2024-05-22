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

import { SpinnerButton } from "./spinner-button"

export function SearchCommandDialogProvider() {
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
      className="bg-background"
      dialogClassName="top-1/3 max-w-[20rem] sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl rounded-2xl sm:rounded-3xl p-4"
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className="max-h-[500px]">
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
          {SIDENAVROUTES.filter((route) => route.title === "Collections").map(
            (navItem) => (
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
            )
          )}
        </CommandGroup>

        <CommandSeparator />
        {/* <CommandGroup heading="Settings">
          <CommandItem
            onSelect={() => {
              runCommand(() => router.push("/user"))
            }}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup> */}

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
    </CommandDialog>
  )
}
