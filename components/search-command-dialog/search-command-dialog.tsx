"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ScrollText } from "lucide-react"

import { AppWithCategoriesAndDevelopers, PostDetails } from "@/types/db_tables"
import { getPostAuthorSlug } from "@/lib/utils"
import useSearchDialogStore from "@/hooks/use-search-dialog-store"
import { AppIcon } from "@/app/(main)/ai-apps/_components/cards/_components/app-icon"
import { AppTitleWithDescription } from "@/app/(main)/ai-apps/_components/cards/_components/app-title-description"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import { ScrollArea } from "../ui/scroll-area"
import { SearchCommandGroups } from "./search-command-groups"

type SearchCommandDialogProps = {
  apps?: AppWithCategoriesAndDevelopers[] | null
  posts?: PostDetails[] | null
}

export const SearchCommandDialog: React.FC<SearchCommandDialogProps> = ({
  apps: db_apps,
  posts: db_storys,
}) => {
  const router = useRouter()
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
    <>
      <CommandDialog
        open={isOpen}
        onOpenChange={toggleSearchDialog}
        commandClassName="bg-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        className="data-[state=closed]:max-md:slide-out-to-bottom-5 data-[state=open]:max-md:!slide-in-from-bottom-5 h-[calc(100vh-3rem)] max-w-full rounded-2xl p-4 py-6 sm:max-w-lg sm:rounded-3xl md:top-1/3 md:h-[720px] md:max-w-xl lg:max-w-2xl xl:max-w-3xl"
      >
        <div className="focus-within:[&_[cmdk-input-wrapper]]:bg-muted mb-2 border-b p-3 transition-all duration-150 ease-out [&_[cmdk-input-wrapper]]:rounded-full [&_[cmdk-input-wrapper]]:border-none">
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
                <CommandGroup heading="Apps">
                  {db_apps?.map((app) => (
                    <CommandItem
                      key={app.app_id}
                      keywords={[
                        app.app_slug,
                        app.description ?? "no description",
                        app.categories
                          ?.flatMap((c) => [
                            c.category_name,
                            c.category_description,
                          ])
                          .join(" ") ?? "",
                        app.developers
                          ?.flatMap((c) => [c.developer_name, c.developer_url])
                          .join(" ") ?? "",
                      ]}
                      value={app.app_title}
                      onSelect={() => {
                        runCommand(() =>
                          router.push(`/ai-apps/${app.app_slug}`)
                        )
                      }}
                    >
                      <div className="flex w-full items-center gap-x-2 md:gap-x-4">
                        <AppIcon {...app} size={12} />
                        <AppTitleWithDescription {...app} />
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {search && db_storys && (
                <CommandGroup heading="Stories">
                  {db_storys?.map((story) => (
                    <CommandItem
                      key={story.post_id}
                      keywords={[
                        story.post_slug,
                        story.labels
                          ?.flatMap((l) => [l.label_name, l.label_description])
                          .join(" ") ?? "",
                        story.categories
                          ?.flatMap((c) => [
                            c.category_name,
                            c.category_description,
                          ])
                          .join(" ") ?? "",
                        story.categories
                          ?.flatMap((c) => [
                            c.category_name,
                            c.category_description,
                          ])
                          .join(" ") ?? "",
                      ]}
                      value={story.post_title}
                      onSelect={() => {
                        runCommand(() =>
                          router.push(
                            `/story/${getPostAuthorSlug(story.profiles)}/${story.post_id}`
                          )
                        )
                      }}
                    >
                      <div className="flex w-full items-center gap-x-2 md:gap-x-4">
                        <ScrollText className="text-muted-foreground" />
                        {story.post_title}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </ScrollArea>
        </section>
      </CommandDialog>
    </>
  )
}
