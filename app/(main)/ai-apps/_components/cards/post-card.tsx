import React, { lazy, Suspense } from "react"

import { PostCardContentProps } from "./post-card-content"

const PostCardContent = lazy(() => import("./post-card-content"))

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
