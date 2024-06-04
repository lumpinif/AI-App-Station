import { Topics } from "@/types/db_tables"
import { Badge } from "@/components/ui/badge"

type StoryTopicsBadgeProps = {
  topics?: Topics[]
}

export const StoryTopicsBadge: React.FC<StoryTopicsBadgeProps> = ({
  topics,
}) => {
  if (!topics) return null

  return (
    <>
      {topics.length > 0 ? (
        <div className="flex items-center gap-x-2">
          {topics.map((topic) => (
            <Badge key={topic.topic_id}>{topic.topic_name}</Badge>
          ))}
        </div>
      ) : null}
    </>
  )
}
