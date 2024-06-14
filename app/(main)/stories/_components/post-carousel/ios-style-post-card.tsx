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

import { CarouselSize } from "./stories-carousel-layout"

type IosStylePostCardProps = {
  post: PostDetails
  postCardVariant?: string
}

export const IosStylePostCard: React.FC<IosStylePostCardProps> = ({
  post,
  postCardVariant,
}) => {
  const { isMobile, isTablet, isDesktop } = useMediaQuery()

  const imageSrc = post.post_image_src || "/images/Feature-thumbnail.png"
  const { color, isLoading } = useAverageColor(imageSrc, true)

  const fullCard = postCardVariant === CarouselSize.Full || "hero"
  const halfCard = postCardVariant === CarouselSize.Half
  const thirdCard = postCardVariant === CarouselSize.Third

  const sliceSize = isMobile
    ? 2
    : (isTablet && halfCard) || thirdCard
      ? 2
      : isDesktop && halfCard
        ? 4
        : isDesktop && thirdCard
          ? 3
          : 5

  const topics = post.topics?.slice(0, sliceSize)

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
          className={cn(
            "size-full object-cover object-center",
            imageSrc === "/images/Feature-thumbnail.png" && "blur brightness-90"
          )}
        />
        {/* overlay */}
        <div
          style={{ backgroundColor: color.rgba, opacity: 0.25 }}
          className={cn("absolute inset-x-0 bottom-0 h-full w-full")}
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
                "w-full max-w-48 text-balance text-left text-4xl font-extrabold uppercase leading-none text-primary drop-shadow-2xl sm:max-w-sm sm:text-5xl",
                fullCard && "md:max-w-md md:text-5xl lg:max-w-lg xl:max-w-3xl",
                halfCard &&
                  "md:max-w-48 md:text-3xl lg:max-w-sm lg:text-4xl xl:max-w-md",
                thirdCard && "md:max-w-44 md:text-3xl lg:max-w-56 xl:max-w-80",
                color.isDark ? "text-white" : "text-zinc-900"
              )}
            >
              {post.post_title.length > 45
                ? post.post_title.substring(0, 45) + "..."
                : post.post_title}
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
                    "text-nowrap text-sm font-normal text-primary",
                    color.isDark ? "text-white" : "text-zinc-900",
                    sliceSize > 1 && "text-xs"
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
