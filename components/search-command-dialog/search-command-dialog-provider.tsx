/* eslint-disable tailwindcss/no-unnecessary-arbitrary-value */
"use client"

import * as React from "react"
import { useEffect } from "react"

import useSearchDialogStore from "@/hooks/use-search-dialog-store"
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import { ScrollArea } from "../ui/scroll-area"
import { SearchCommandGroups } from "./search-command-groups"

export function SearchCommandDialogProvider() {
  const [search, setSearch] = React.useState("")
  const isOpen = useSearchDialogStore((state) => state.isOpen)

  const toggleSearchDialog = useSearchDialogStore(
    (state) => state.toggleSearchDialog
  )

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
            <SearchCommandGroups runCommand={runCommand} />
          </CommandList>
          <div>Search Results: {search}</div>
        </ScrollArea>
      </section>
    </CommandDialog>
  )
}
