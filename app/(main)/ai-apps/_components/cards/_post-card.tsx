import React, { lazy, Suspense } from "react"

import { PostCardContentProps } from "./post-card"

const PostCardContent = lazy(() => import("./post-card"))

const PostCard: React.FC<PostCardContentProps> = (props) => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <PostCardContent {...props} />
      </Suspense>
    </>
  )
}

export default PostCard
