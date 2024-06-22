import { Suspense } from "react"
import Link from "next/link"

import LoadingFallback from "@/components/shared/loading-fallback"

import { FeaturedStoriesCarousel } from "../stories/_components/post-carousel/featured-stories-carousel"
import TodayPageTitle from "./_components/today-page-title"
import { TodayUserCard } from "./_components/today-user-card"
import { DailyApp } from "./app/_components/daily-app"
import { DailyPost } from "./daily-post/_components/daily-post"

const TodayPage = () => {
  return (
    <>
      <TodayPageTitle />

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <TodayUserCard />

        {/* <Suspense fallback={<LoadingFallback />}> */}
        <DailyPost />
        {/* </Suspense> */}

        {/* <Suspense fallback={<LoadingFallback />}> */}
        <DailyApp />
        {/* </Suspense> */}

        {/* <div className="">Story of Today</div> */}
        {/* <div className="">New Stories</div> */}
        {/* <div className="">New App</div> */}
        {/* <div className="">Featured Apps</div> */}
      </div>

      <Link
        href={"/stories"}
        className="page-title-font w-full border-b text-2xl"
      >
        Featured Stories
      </Link>
      <Suspense fallback={<LoadingFallback />}>
        <FeaturedStoriesCarousel className="md:basis-1/2" />
      </Suspense>
    </>
  )
}

export default TodayPage
