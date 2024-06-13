import Image from "next/image"
import Link from "next/link"
import { User } from "@supabase/supabase-js"
import { JSONContent } from "novel"

import { PostDetails } from "@/types/db_tables"
import { cn, getPostAuthorSlug, getPostContentPreview } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { AuthorCard } from "@/app/(main)/story/_components/story-author-card"

import { StoryCardDropDown } from "./story-card-dropdown"

type StoryCardProps = {
  post: PostDetails
  user_id: User["id"]
}

export const StoryCard: React.FC<StoryCardProps> = ({ post, user_id }) => {
  const contentPreview = getPostContentPreview(
    post.post_content as JSONContent,
    40
  )

  const authorSlug = getPostAuthorSlug(post.profiles)
  const postRoute = `/story/${authorSlug}/${post.post_id}`

  return (
    <div className="col-span-1 flex w-full flex-col gap-y-6 rounded-xl border border-border/50 p-2 py-4 shadow-sm transition-all duration-150 ease-out hover:shadow-md dark:shadow-none hover:dark:shadow-none md:p-4">
      <Link href={postRoute}>
        <AspectRatio ratio={16 / 9} className="rounded-lg shadow-md">
          <Image
            fill
            alt={"Feature Image"}
            src={post.post_image_src || "/images/Feature-thumbnail.png"}
            className={cn("rounded-lg object-cover object-center")}
          />
        </AspectRatio>
      </Link>

      <div className="flex h-full flex-col justify-between gap-y-4">
        <span className="flex flex-col gap-y-4">
          {/* Authro Info */}
          <AuthorCard
            avatarCN="size-6"
            author={post.profiles}
            post_created_at={post.created_at}
            authorNameCN="font-normal"
            InfoCN="flex-row items-center w-full justify-between"
          />

          {/* Preview */}
          <Link href={postRoute} className="flex flex-col gap-y-2">
            <h3 className="line-clamp-2 text-xl font-semibold">
              {post.post_title}
            </h3>
            <p className="line-clamp-3 text-sm">{contentPreview}</p>
          </Link>
        </span>

        {/* Topics and Actions */}
        <span className="flex w-full items-center justify-between">
          <div className="flex items-center gap-x-2">
            {!post.topics?.length ? (
              <div className=""></div>
            ) : (
              post.topics?.slice(0, 3).map((topic, index) => (
                <Link href={`/stories/topics/${topic.topic_slug}`}>
                  <Badge
                    key={post.post_id + index}
                    variant={"outline"}
                    className="select-none border-border/40 hover:cursor-pointer hover:border-border/0 hover:bg-card hover:shadow-outline active:scale-[.98]"
                  >
                    {topic.topic_name}
                  </Badge>
                </Link>
              ))
            )}
          </div>

          <StoryCardDropDown
            user_id={user_id}
            post_id={post.post_id}
            post_likes={post.post_likes}
            authorProfile={post.profiles}
          />
        </span>
      </div>
    </div>
  )
}
