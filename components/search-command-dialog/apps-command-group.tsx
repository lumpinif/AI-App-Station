import { useRouter } from "next/navigation"

import { AppWithCategoriesAndDevelopers } from "@/types/db_tables"
import { AppIcon } from "@/app/(main)/ai-apps/_components/cards/_components/app-icon"
import { AppTitleWithDescription } from "@/app/(main)/ai-apps/_components/cards/_components/app-title-description"

import { CommandGroup, CommandItem } from "../ui/command"

type AppsCommandGroupProps = {
  db_apps?: AppWithCategoriesAndDevelopers[] | null
  runCommand: (command: () => unknown, isToggleSearchDialog?: boolean) => void
}

export const AppsCommandGroup: React.FC<AppsCommandGroupProps> = ({
  db_apps,
  runCommand,
}) => {
  const router = useRouter()
  return (
    <CommandGroup heading="Apps">
      {db_apps?.map((app) => (
        <CommandItem
          key={app.app_id}
          keywords={[
            app.app_slug,
            app.description ?? "no description",
            app.categories
              ?.flatMap((c) => [c.category_name, c.category_description])
              .join(" ") ?? "",
            app.developers
              ?.flatMap((c) => [c.developer_name, c.developer_url])
              .join(" ") ?? "",
          ]}
          value={app.app_title}
          onSelect={() => {
            runCommand(() => router.push(`/ai-apps/${app.app_slug}`))
          }}
        >
          <div className="flex w-full items-center gap-x-2 md:gap-x-4">
            <AppIcon {...app} size={12} />
            <AppTitleWithDescription {...app} />
          </div>
        </CommandItem>
      ))}
    </CommandGroup>
  )
}
