"use client"

import Image from "next/image"
import Link from "next/link"
import moment from "moment"

import { PostDetails } from "@/types/db_tables"
import { cn, getPostAuthorSlug } from "@/lib/utils"
import useAverageColor from "@/hooks/use-average-color"
import useMediaQuery from "@/hooks/use-media-query"
import { Badge } from "@/components/ui/badge"
import { AvatarIcon } from "@/components/auth/avatar/avatar-icon"
import { LoadingSpinner } from "@/components/shared/loading-spinner"

type IosStylePostCardProps = {
  post: PostDetails
}

export const IosStylePostCard: React.FC<IosStylePostCardProps> = ({ post }) => {
  const { isMobile, isTablet, isDesktop } = useMediaQuery()
  const sliceSize = isMobile ? 2 : isTablet ? 2 : isDesktop ? 3 : 4
  const topics = post.topics?.slice(0, sliceSize)

  const imageSrc = post.post_image_src || "/images/Feature-thumbnail.png"
  const { color, isLoading } = useAverageColor(imageSrc, true)

  if (isLoading) {
    return (
      <div className="size-full overflow-hidden">
        <div className="relative flex h-[430px] select-none items-center justify-center overflow-hidden outline-none">
          <LoadingSpinner className="mx-auto my-auto w-fit" />
        </div>
      </div>
    )
  }

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
        {/* overlay */}
        <div
          className="absolute inset-x-0 bottom-0 h-full w-full"
          style={{ backgroundColor: color.rgba, opacity: 0.25 }}
        />
        {/* Content */}
        <div
          className="absolute inset-x-0 bottom-0 overflow-hidden"
          // style={{
          //   background: `linear-gradient(to bottom, rgba(${color.colorEnd},0) 0%,rgba(${color.colorEnd},0.25) 5%, rgba(${color.colorEnd},0.55) 10%, rgba(${color.colorEnd},0.75) 15%, rgba(${color.colorEnd},0.85) 35%, rgba(${color.colorEnd},0.95) 50%, ${color.rgba} 55%, ${color.rgba} 100%)`,
          // }}
          style={{
            background: `linear-gradient(to bottom, rgba(${color.colorEnd},0) 0%, ${color.rgba} 55%, ${color.rgba} 100%)`,
          }}
        >
          {/* Card Text */}
          <div className="px-4 pt-0">
            <h2
              className={cn(
                "max-w-32 text-left text-4xl font-extrabold uppercase leading-none text-primary drop-shadow-2xl sm:max-w-52",
                color.isDark ? "text-white" : "text-zinc-900"
              )}
            >
              {post.post_title.substring(0, 50)}
            </h2>
          </div>

          {/* Extra info */}
          <div className="relative flex w-full items-end justify-between gap-2 px-4 py-6 transition-all duration-200 ease-out sm:px-6 sm:py-8">
            <div
              className={cn(
                "flex items-center gap-x-2 text-sm font-semibold",
                color.isDark ? "text-white" : "text-zinc-900"
              )}
            >
              <AvatarIcon
                profile={post.profiles}
                className={cn(
                  "size-6 select-none sm:size-8 md:size-10",
                  color.isDark ? "text-white" : "text-zinc-900"
                )}
              />
              <div
                className={cn(
                  "flex flex-col",
                  color.isDark ? "text-white" : "text-zinc-900"
                )}
              >
                <p className="text-nowrap">{post.profiles.full_name}</p>
                <p
                  className={cn(
                    "text-sm font-normal text-primary",
                    color.isDark ? "text-white" : "text-zinc-900"
                  )}
                >
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
