import Image from "next/image"
import Link from "next/link"

import { Posts, PostWithProfile } from "@/types/db_tables"
import { cn, getPostAuthorSlug } from "@/lib/utils"

type PostCardProps = {
  post: PostWithProfile
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {
    post_id,
    post_slug,
    post_title,
    post_label,
    post_author_id,
    post_image_src,
    post_description,
  } = post

  return (
    <Link
      href={`/story/${getPostAuthorSlug(post.profiles)}/${post.post_id}`}
      passHref
      className="size-full rounded-2xl"
    >
      <ImageElement post_image_src={post_image_src} />
      <div className="relative h-full w-full rounded-2xl">
        <ImageText
          post_label={post_label}
          post_title={post_title}
          post_description={post_description}
          className="bottom-6"
        />

        <div className="absolute inset-x-0 bottom-0 h-4/6 w-full bg-gradient-to-t from-background/90 via-background/60 via-60% to-transparent" />
        {/* <BottomBlur
          className="bottom-1 h-3/5 rounded-2xl lg:hidden 2xl:block"
          isLastBackground={false}
        /> */}
      </div>
    </Link>
  )
}

export const ImageElement = ({
  post_image_src,
  className,
}: {
  post_image_src: Posts["post_image_src"]
  className?: string
}) => {
  return (
    <Image
      alt={post_image_src ? "Post Image" : "Feature Image"}
      src={post_image_src ? post_image_src : "/images/Feature-thumbnail.png"}
      className={cn("rounded-lg object-cover object-center", className)}
      fill
    />
  )
}

const ImageText = ({
  className,
  post_label,
  post_title,
  post_description,
}: {
  post_label: Posts["post_label"]
  post_title: Posts["post_title"]
  post_description: Posts["post_description"]
  className?: string
}) => {
  return (
    <div
      className={cn(
        "absolute z-20 flex w-full max-w-2xl flex-col items-start justify-between space-y-4 rounded-2xl p-6 lg:px-10",
        className
      )}
    >
      <span className="flex flex-col space-y-2">
        <span className="text-xs font-medium uppercase leading-none tracking-wide text-primary mix-blend-difference md:text-sm">
          {post_label}
        </span>
        <span className="w-full text-wrap text-2xl font-semibold leading-none 2xl:text-3xl">
          {post_title}
        </span>
      </span>
      <span className="text-xs tracking-wide text-primary/80 mix-blend-difference md:text-sm">
        {post_description}
      </span>
    </div>
  )
}
