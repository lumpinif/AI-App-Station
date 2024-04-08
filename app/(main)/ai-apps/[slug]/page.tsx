import { notFound } from "next/navigation"
import { getAppBySlug } from "@/server/data"

import { AppIcon } from "../_components/cards/_components/app-icon"
import AppDetailCommentSection from "./_components/app-detail-comment-section"
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
      <main className=" p-1">
        <div className="flex flex-col items-start space-y-6 md:space-y-12">
          <div className="flex w-full items-center max-md:space-x-8 max-sm:space-x-4 md:flex-row-reverse">
            <div className="max-w-32 flex-none md:max-w-48">
              <AppIcon
                {...app}
                size={"full"}
                isLink={false}
                externalLink={app.app_url!}
              />
            </div>
            <AppDetailInfo
              data={app}
              className="flex flex-1 flex-col sm:space-y-2 md:space-y-4"
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:space-x-2">
            <div className="flex flex-1 flex-col space-y-6 ">
              <AppDetailScreenshots />
              <AppDetailIntroduction data={app.introduction} />
              <AppDetailReviews {...ratingData} />
              <AppDetailCommentSection app_id={app.app_id} />
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
