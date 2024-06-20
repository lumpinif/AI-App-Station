import Image from "next/image"
import Link from "next/link"

import { PostDetails } from "@/types/db_tables"
import { cn, getPostAuthorSlug } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { AvatarIcon } from "@/components/auth/avatar/avatar-icon"
import { StoryPublishInfo } from "@/app/(main)/story/_components/story-publish-details"

type PostCarouselCardProps = {
  post: PostDetails
}

export const PostCarouselCard: React.FC<PostCarouselCardProps> = ({ post }) => {
  return (
    <Link
      href={`/story/${getPostAuthorSlug(post.profiles)}/${post.post_id}`}
      className="relative size-full overflow-hidden rounded-2xl"
    >
      <AspectRatio ratio={16 / 9} className="rounded-lg shadow-md">
        <Image
          fill
          alt={`Story ${post.post_slug} thumbnail image`}
          src={post.post_image_src || "/images/Feature-thumbnail.png"}
          className={cn("rounded-t-lg object-cover object-center")}
        />
      </AspectRatio>

      <div className="px-4 py-2">
        <div className="grid w-full">
          <h3 className="line-clamp-2 font-semibold">{post.post_title}</h3>
        </div>
        <div className="grid w-full grid-cols-2">
          <div className="flex items-center">
            <div
              className={cn(
                "flex items-center gap-x-2 text-sm font-semibold underline-offset-4"
              )}
            >
              <AvatarIcon
                profile={post.profiles}
                className={cn("size-6 select-none")}
              />
              {post.profiles.full_name}
            </div>
          </div>

          <StoryPublishInfo
            showStatusLable={false}
            className="flex-row gap-x-1"
            post_created_at={post.created_at}
            post_publish_status={post.post_publish_status}
            publishStatusCN="text-sm p-0 text-muted-foreground"
          />
        </div>
      </div>
    </Link>
  )
}
