import { notFound } from "next/navigation"
import { getAppBySlug } from "@/server/data"

import { Button } from "@/components/ui/button"

import { AppIcon } from "../_components/cards/_components/app-icon"
import { AppTitleWithDescription } from "../_components/cards/_components/app-title-description"
import TestAppDetailCommentSection from "./_components/app-comment-section"
import { AppDetailInfo } from "./_components/app-detail-info"
import { AppDetailIntroduction } from "./_components/app-detail-introduction"
import { AppDetailReviews } from "./_components/app-detail-reviews"
import { AppDetailScreenshots } from "./_components/app-detail-screenshots"
import { AppDetailSubInfo } from "./_components/app-detail-sub-info"

export default async function AppPagePage({
  params,
}: {
  params: { slug: string }
}) {
  // TODO: ERROR HANDLING
  const { app, ratingData, error } = await getAppBySlug(params.slug)

  if (error) {
    console.error(error)
  }

  if (!app) {
    notFound()
  }

  return (
    <>
      <main className="mt-6">
        <div className="flex flex-col items-start space-y-6 md:space-y-12">
          <div className="flex w-full flex-col items-start space-y-6">
            <div className="flex w-full items-start justify-between space-x-4">
              <div className="mt-1 size-20 flex-none sm:size-28 md:size-32 lg:size-40">
                <AppIcon
                  {...app}
                  size={"full"}
                  isLink={false}
                  externalLink={app.app_url!}
                />
              </div>
              <AppTitleWithDescription
                {...app}
                className="items-start tracking-tight sm:tracking-wide sm:[&>*:nth-child(1)]:hover:no-underline"
                titleSize="3xl"
                titleClassname="text-2xl md:text-4xl xl:text-5xl"
                titleFont="bold"
                descriptionSize="sm"
                descriptionClassname="tracking tracking-normal"
                isTruncate={false}
                isLink={false}
              />
            </div>

            <AppDetailInfo
              data={app}
              {...ratingData}
              className="flex flex-1 flex-col sm:space-y-8 md:space-y-12"
            />

            <Button className="mx-auto w-full max-w-lg">Launch</Button>
          </div>
          <div className="flex flex-col lg:flex-row lg:space-x-4">
            <div className="flex flex-1 flex-col space-y-6 ">
              <AppDetailScreenshots />
              <AppDetailIntroduction data={app.introduction} />
              <AppDetailReviews {...ratingData} />
              <TestAppDetailCommentSection app_id={app.app_id} />
            </div>
            <div className="mt-6 lg:mt-0">
              <AppDetailSubInfo
                created_at={app.profiles.created_at}
                avatar_url={app.profiles.avatar_url}
                lastUpdated={app.updated_at}
                submitted_by={app.profiles.full_name}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
