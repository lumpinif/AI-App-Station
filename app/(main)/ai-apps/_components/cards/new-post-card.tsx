import Image from "next/image"
import Link from "next/link"

import { PostCardProps } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { BottomBlur } from "@/components/shared/progressive-blur"

export const PostCard: React.FC<PostCardProps> = ({
  label,
  title,
  description,
  image_src,
  slug,
}) => {
  return (
    <Link
      href={`/story/${slug}`}
      scroll={false}
      passHref
      className="size-full rounded-2xl"
    >
      <ImageElement image_src={image_src} />
      <div className="relative h-full w-full rounded-2xl">
        <ImageText
          label={label}
          title={title}
          description={description}
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

export const ImageElement: React.FC<
  Pick<PostCardProps, "image_src"> & { className?: string }
> = ({ image_src, className }) => {
  return (
    <Image
      alt=""
      src={image_src ? image_src : "/images/Feature-thumbnail.png"}
      className={cn("rounded-lg", className)}
      objectPosition="center"
      fill
      style={{
        objectFit: "cover",
      }}
    />
  )
}

const ImageText: React.FC<
  Omit<PostCardProps, "image_src" | "slug"> & { className?: string }
> = ({ className, label, title, description }) => {
  return (
    <div
      className={cn(
        "absolute z-20 flex w-full max-w-2xl flex-col items-start justify-between space-y-4 rounded-2xl p-6 lg:px-10",
        className
      )}
    >
      <span className="flex flex-col space-y-2">
        <span className="text-xs font-medium uppercase leading-none tracking-wide text-primary mix-blend-difference md:text-sm">
          {label} what to watch
        </span>
        <span className="w-full text-wrap text-2xl font-semibold leading-none 2xl:text-3xl">
          {title}
        </span>
      </span>
      <span className="text-xs tracking-wide text-primary/80 mix-blend-difference md:text-sm">
        {description}
      </span>
    </div>
  )
}
