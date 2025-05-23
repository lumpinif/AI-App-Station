import moment from "moment"

import { Posts } from "@/types/db_tables"
import { cn } from "@/lib/utils"

type StoryPublishInfoProps = {
  className?: string
  publishStatusCN?: string
  showStatusLable?: boolean
  post_created_at: Posts["created_at"]
  post_publish_status: Posts["post_publish_status"]
}

export const StoryPublishInfo: React.FC<StoryPublishInfoProps> = ({
  className,
  publishStatusCN,
  post_created_at,
  showStatusLable = true,
  post_publish_status,
}) => {
  let statusText
  switch (post_publish_status) {
    case "draft":
      statusText = "Draft"
      break
    case "pending":
      statusText = "Pending"
      break
    case "published":
      statusText = "Published on"
      break
    case "unpublished":
      statusText = "Unpublished"
      break
    default:
      statusText = "Unknown status"
  }

  return (
    <div className={cn("flex flex-col gap-y-2", className)}>
      {showStatusLable && (
        <p className="text-xs text-muted-foreground sm:text-sm">
          {post_publish_status === "published" ? "Published on" : "Status"}
        </p>
      )}
      <p className={cn("py-2 font-medium text-primary", publishStatusCN)}>
        {post_publish_status === "published"
          ? moment(post_created_at).format("MMM Do YYYY")
          : statusText}
      </p>
    </div>
  )
}
