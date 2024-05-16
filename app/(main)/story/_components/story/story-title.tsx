import { Posts } from "@/types/db_tables"

type StoryTitleProps = {
  post_title: Posts["post_title"]
}

export const StoryTitle: React.FC<StoryTitleProps> = ({ post_title }) => {
  return (
    <div className="text-2xl font-semibold sm:text-3xl md:text-4xl">
      {post_title}
    </div>
  )
}
