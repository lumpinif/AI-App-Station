import Image from "next/image"
import Link from "next/link"

import { PostCardProps } from "@/types/db_tables"
import { cn } from "@/lib/utils"

export const PostCard: React.FC<PostCardProps> = ({
  post_label,
  post_title,
  post_description,
  post_image_src,
  post_slug,
}) => {
  return (
    <Link
      href={`/story/${post_slug}`}
      scroll={false}
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

        <div className="from-background/90 via-background/60 absolute inset-x-0 bottom-0 h-4/6 w-full bg-gradient-to-t via-60% to-transparent" />
        {/* <BottomBlur
          className="bottom-1 h-3/5 rounded-2xl lg:hidden 2xl:block"
          isLastBackground={false}
        /> */}
      </div>
    </Link>
  )
}

export const ImageElement: React.FC<
  Pick<PostCardProps, "post_image_src"> & { className?: string }
> = ({ post_image_src, className }) => {
  return (
    <Image
      alt={post_image_src ? "Post Image" : "Feature Image"}
      src={post_image_src ? post_image_src : "/images/Feature-thumbnail.png"}
      className={cn("rounded-lg", className)}
      objectPosition="center"
      fill
      style={{ objectFit: "cover" }}
    />
  )
}

const ImageText: React.FC<
  Omit<PostCardProps, "post_image_src" | "post_slug"> & { className?: string }
> = ({ className, post_label, post_title, post_description }) => {
  return (
    <div
      className={cn(
        "absolute z-20 flex w-full max-w-2xl flex-col items-start justify-between space-y-4 rounded-2xl p-6 lg:px-10",
        className
      )}
    >
      <span className="flex flex-col space-y-2">
        <span className="text-primary text-xs font-medium uppercase leading-none tracking-wide mix-blend-difference md:text-sm">
          {post_label} what to watch
        </span>
        <span className="w-full text-wrap text-2xl font-semibold leading-none 2xl:text-3xl">
          {post_title}
        </span>
      </span>
      <span className="text-primary/80 text-xs tracking-wide mix-blend-difference md:text-sm">
        {post_description}
      </span>
    </div>
  )
}
