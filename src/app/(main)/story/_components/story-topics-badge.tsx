import Link from "next/link"

import { Topics } from "@/types/db_tables"
import { Badge } from "@/components/ui/badge"

type StoryTopicsBadgeProps = {
  topics?: Topics[]
}

export const StoryTopicsBadge: React.FC<StoryTopicsBadgeProps> = ({
  topics,
}) => {
  if (!topics || topics.length === 0) return null
  // TODO: IMPLMENTING THE LINK TO THE TOPICS PAGE
  return (
    <>
      <p className="text-xs text-muted-foreground sm:text-sm">Topics</p>
      {topics.length > 0 ? (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
          {topics.map((topic) => (
            <Link
              key={topic.topic_id}
              href={`/stories/topics/${topic.topic_slug}`}
            >
              <Badge
                variant={"outline"}
                key={topic.topic_id}
                className="text-sm font-normal text-muted-foreground hover:cursor-pointer active:scale-[.98] dark:border-0 dark:shadow-outline"
              >
                {topic.topic_name}
              </Badge>
            </Link>
          ))}
        </div>
      ) : null}
    </>
  )
}
