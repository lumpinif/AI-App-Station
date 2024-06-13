"use client"

import Image from "next/image"
import Link from "next/link"
import moment from "moment"

import { PostDetails } from "@/types/db_tables"
import { cn, getPostAuthorSlug } from "@/lib/utils"
import useMediaQuery from "@/hooks/use-media-query"
import { Badge } from "@/components/ui/badge"
import { AvatarIcon } from "@/components/auth/avatar/avatar-icon"

type IosStylePostCardProps = {
  post: PostDetails
}

export const IosStylePostCard: React.FC<IosStylePostCardProps> = ({ post }) => {
  const { isMobile, isTablet, isDesktop } = useMediaQuery()

  const sliceSize = isMobile ? 2 : isTablet ? 2 : isDesktop ? 3 : 4

  const topics = post.topics?.slice(0, sliceSize)

  return (
    <Link
      scroll={false}
      href={`/story/${getPostAuthorSlug(post.profiles)}/${post.post_id}`}
      className="size-full overflow-hidden"
    >
      <div className="relative h-[430px] w-full select-none overflow-hidden outline-none">
        {/* Image background */}
        <Image
          fill
          alt={`Story ${post.post_slug} thumbnail image`}
          src={post.post_image_src || "/images/Feature-thumbnail.png"}
          className={cn("size-full object-cover object-center")}
        />
        {/* Content */}
        <div className="absolute -inset-x-0 bottom-0 overflow-hidden">
          {/* Card Text */}
          <div className="px-4 pb-3 pt-0">
            <h2 className="mb-1 max-w-40 text-left text-4xl font-extrabold uppercase leading-none text-primary sm:max-w-52">
              {post.post_title.substring(0, 50)}
            </h2>
          </div>
          {/* Extra info */}
          <div className="relative flex w-full items-end justify-between gap-2 bg-background/90 px-4 py-4 backdrop-blur-sm dark:bg-background/30 sm:px-6 sm:py-6">
            <div
              className={cn("flex items-center gap-x-2 text-sm font-semibold")}
            >
              <AvatarIcon
                profile={post.profiles}
                className={cn("size-6 select-none sm:size-8 md:size-10")}
              />
              <div className="flex flex-col">
                <p className="text-nowrap">{post.profiles.full_name}</p>
                <p className="text-sm font-normal text-primary">
                  {moment(post.created_at).format("MMM Do YYYY")}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start">
              <div className="flex items-center gap-x-1">
                {topics?.length ? (
                  topics.map((topic, index) => (
                    <Badge
                      key={post.post_id + index}
                      variant={"default"}
                      className="select-none text-nowrap bg-white text-blue-500"
                    >
                      {topic.topic_name}
                    </Badge>
                  ))
                ) : (
                  <Badge
                    key={post.post_id}
                    variant={"default"}
                    className="select-none text-nowrap bg-white text-blue-500"
                  >
                    Check
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
