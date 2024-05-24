import { useRouter } from "next/navigation"
import { ScrollText } from "lucide-react"

import { PostDetails } from "@/types/db_tables"
import { getPostAuthorSlug } from "@/lib/utils"

import { CommandGroup, CommandItem } from "../ui/command"

type StoriesCommandGroupProps = {
  db_storys?: PostDetails[] | null
  runCommand: (command: () => unknown, isToggleSearchDialog?: boolean) => void
}

export const StoriesCommandGroup: React.FC<StoriesCommandGroupProps> = ({
  db_storys,
  runCommand,
}) => {
  const router = useRouter()
  return (
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
              ?.flatMap((c) => [c.category_name, c.category_description])
              .join(" ") ?? "",
            story.categories
              ?.flatMap((c) => [c.category_name, c.category_description])
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
  )
}
