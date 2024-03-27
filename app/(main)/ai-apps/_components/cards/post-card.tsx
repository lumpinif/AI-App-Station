import React from "react"
import Image from "next/image"
import Link from "next/link"

import { PostCardProps } from "@/types/db_tables"

const PostCard: React.FC<PostCardProps> = ({
  label,
  title,
  description,
  image_src,
  slug,
}) => {
  return (
    <>
      <Link href={`/story/${slug}`} scroll={false}>
        <div className="relative h-96 w-full cursor-pointer rounded-lg bg-card px-8">
          {/* Image */}
          <Image
            alt=""
            src={image_src ? image_src : "/images/tool-preview.png"}
            fill
            objectFit="cover"
            className="rounded-lg"
            objectPosition="center"
          />

          {/* Overlay */}
          {/* <span className="absolute inset-x-0 bottom-0 z-10 h-full w-full bg-white opacity-40 dark:bg-black"></span> */}
          <span className=" absolute inset-x-0 bottom-0 z-10 h-full w-full bg-gradient-to-r from-background/50 to-transparent"></span>
          {/* Text */}
          <div className="absolute top-[15%] z-20 flex max-w-xs flex-col items-start justify-between gap-y-3">
            <span className="text-xs font-medium uppercase leading-none tracking-tight mix-blend-difference">
              {label}
            </span>
            <span className="text-2xl font-medium leading-none tracking-tight">
              {title}
            </span>
            <span className="text-xs tracking-tight mix-blend-difference">
              {description}
            </span>
          </div>
        </div>
      </Link>
    </>
  )
}

export default PostCard
