import React from "react"
import Image from "next/image"
import Link from "next/link"

import { PostCardProps } from "@/types/db_tables"

const PostCard: React.FC<PostCardProps> = ({
  post_label,
  post_title,
  post_description,
  post_image_src,
  post_slug,
}) => {
  return (
    <>
      <Link href={`/story/${post_slug}`} scroll={false} passHref>
        <div className="bg-card relative h-80 w-full cursor-pointer rounded-2xl px-8">
          {/* Image */}
          <div className="relative h-full w-full ">
            <Image
              alt={post_image_src ? "Post Image" : "Feature Image"}
              src={post_image_src ? post_image_src : "/images/preview1.png"}
              fill
              className="rounded-lg object-contain object-center"
            />
          </div>

          {/* Overlay */}
          {/* <span className="absolute inset-x-0 bottom-0 z-10 h-full w-full bg-white opacity-40 dark:bg-black"></span> */}
          <span className=" from-background/50 absolute inset-x-0 bottom-0 z-10 h-full w-full bg-gradient-to-r to-transparent" />
          {/* Text */}
          <div className="absolute top-[15%] z-20 flex max-w-xs flex-col items-start justify-between gap-y-3">
            <span className="text-xs font-medium uppercase leading-none tracking-tight mix-blend-difference">
              {post_label}
            </span>
            <span className="text-2xl font-medium leading-none tracking-tight">
              {post_title}
            </span>
            <span className="text-xs tracking-tight mix-blend-difference">
              {post_description}
            </span>
          </div>
        </div>
      </Link>
    </>
  )
}

export default PostCard
