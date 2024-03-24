import React, { lazy, Suspense } from "react"

import { HeroPostsCardContentProps } from "./hero-posts-card-content"

const HeroPostsCardLazy = lazy(() => import("./hero-posts-card-content"))

const HeroPostsCard: React.FC<HeroPostsCardContentProps> = (props) => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <HeroPostsCardLazy {...props} />
      </Suspense>
    </>
  )
}

export default HeroPostsCard
