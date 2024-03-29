import { notFound } from "next/navigation"
import { getAppBySlug, getComments } from "@/server/data"

import { CommentWithProfile } from "@/types/db_tables"

import { AppIcon } from "../_components/cards/_components/app-icon"
import AppDetailComments from "./_components/app-detail-comment"
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
  const { app, error } = await getAppBySlug(params.slug)

  if (!app) {
    notFound()
  }

  const { comments } = await getComments(app.app_id)

  return (
    <>
      <main className=" p-1">
        <div className="flex flex-col items-start">
          <div className="flex w-full items-center gap-x-2  md:gap-x-6">
            <div className="flex-none  md:max-w-48 md:p-2 lg:p-4">
              <AppIcon
                {...app}
                size={"full"}
                isLink={false}
                externalLink={app.app_url!}
              />
            </div>
            <AppDetailInfo data={app} />
          </div>
          <div className="flex flex-col  lg:flex-row">
            <div className="flex flex-1 flex-col space-y-6 ">
              <AppDetailScreenshots />
              <AppDetailIntroduction data={app.introduction} />
              <AppDetailReviews />
              <AppDetailComments
                app_id={app.app_id}
                comments={comments as CommentWithProfile[]}
              />
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
