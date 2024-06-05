"use client"

import React, { useEffect } from "react"
import { User } from "@supabase/supabase-js"

import { AppWithCategoriesAndDevelopers, PostDetails } from "@/types/db_tables"
import useSearchDialogStore from "@/hooks/use-search-dialog-store"

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "../ui/command"
import { ScrollArea } from "../ui/scroll-area"
import { AppsCommandGroup } from "./apps-command-group"
import { FooterCommandDialog } from "./footer-command-dialog"
import { SearchCommandGroups } from "./search-command-groups"
import { StoriesCommandGroup } from "./stories-command-group"

type SearchCommandDialogProps = {
  apps?: AppWithCategoriesAndDevelopers[] | null
  posts?: PostDetails[] | null
  user?: User | null
}

export const SearchCommandDialog: React.FC<SearchCommandDialogProps> = ({
  user,
  apps: db_apps,
  posts: db_storys,
}) => {
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
      commandClassName="bg-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 [&_[cmdk-group-heading]]:text-primary dark:[&_[cmdk-group-heading]]:text-muted-foreground "
      className="h-[calc(100vh-3rem)] max-w-full rounded-2xl p-4 data-[state=closed]:max-md:slide-out-to-bottom-5 data-[state=open]:max-md:!slide-in-from-bottom-5 sm:max-w-lg sm:rounded-3xl md:top-1/3 md:h-[720px] md:max-w-xl lg:max-w-2xl xl:max-w-3xl"
    >
      <div className="mb-2 border-b p-3 transition-all duration-150 ease-out [&_[cmdk-input-wrapper]]:rounded-full [&_[cmdk-input-wrapper]]:border-none focus-within:[&_[cmdk-input-wrapper]]:bg-input">
        <CommandInput
          value={search}
          placeholder="Type a command or search..."
          onValueChange={setSearch}
        />
      </div>

      <section className="flex size-full overflow-hidden">
        <ScrollArea className="w-full">
          <CommandList className="relative size-full !max-h-none pr-2 md:px-4">
            <CommandEmpty>No results found.</CommandEmpty>

            <SearchCommandGroups runCommand={runCommand} />

            {search && db_apps && (
              <AppsCommandGroup db_apps={db_apps} runCommand={runCommand} />
            )}

            {search && db_storys && (
              <StoriesCommandGroup
                db_storys={db_storys}
                runCommand={runCommand}
              />
            )}
          </CommandList>
        </ScrollArea>
      </section>

      <FooterCommandDialog user={user} />
    </CommandDialog>
  )
}
