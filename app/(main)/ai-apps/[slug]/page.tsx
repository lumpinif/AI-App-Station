import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getAllComments, getAppBySlug } from "@/server/data"

import { Comment } from "@/types/db_tables"

import { AppIcon } from "../_components/cards/_components/app-icon"
import { AppTitleWithDescription } from "../_components/cards/_components/app-title-description"
import AppDetailCommentSection from "./_components/app-comment-section"
import { AppDetailDeveloper } from "./_components/app-detail-developer"
import { AppDetailHeroImage } from "./_components/app-detail-hero-image"
import { AppDetailInfo } from "./_components/app-detail-info"
import { AppDetailIntroduction } from "./_components/app-detail-introduction"
import { AppDetailReviews } from "./_components/app-detail-reviews"
import { AppDetailScreenshots } from "./_components/app-detail-screenshots"
import { AppDetailSubInfo } from "./_components/app-detail-sub-info"
import { AppLaunchButton } from "./_components/app-launch-button"

export type AppPageProps = {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function AppPagePage({
  params,
  searchParams,
}: AppPageProps) {
  // const c_order: "asc" | "desc" | undefined =
  //   searchParams?.c_order === "asc"
  //     ? "asc"
  //     : searchParams?.c_order === "desc"
  //       ? "desc"
  //       : undefined

  // const orderBy: keyof Comment =
  //   (searchParams?.orderBy as keyof Comment) ?? undefined

  const c_order = searchParams?.c_order as "asc" | "desc" | undefined
  const orderBy = searchParams?.orderBy as keyof Comment | undefined

  // TODO: ERROR HANDLING
  const { app, ratingData, error } = await getAppBySlug(params.slug)

  if (error) {
    console.error(error)
  }

  //TODO: HANDLING APP NOT FOUND
  if (!app) {
    notFound()
  }

  const { comments: allComments, error: getAllCommentsError } =
    await getAllComments(app.app_id, c_order, orderBy)
  // TODO: HANDLE NO COMMENTS AND ERROR

  return (
    <>
      <main className="mt-16 sm:mt-4" suppressHydrationWarning>
        {/* <AppDetailHeroImage /> */}
        <div className="flex flex-col items-start space-y-6 md:space-y-12">
          <div className="flex w-full flex-col items-start space-y-6">
            <div className="flex w-full items-start space-x-4 md:space-x-8 lg:space-x-12">
              <div className="size-28 flex-none sm:size-32 md:size-40 lg:size-44">
                <AppIcon
                  {...app}
                  size={"full"}
                  isLink={false}
                  externalLink={app.app_url}
                />
              </div>
              <div className="flex h-28 w-full flex-col items-start justify-between sm:h-32 md:h-40 lg:h-44">
                <AppTitleWithDescription
                  {...app}
                  className="w-full items-start text-ellipsis tracking-tight sm:tracking-wide md:gap-2 lg:gap-3 sm:[&>*:nth-child(1)]:hover:no-underline"
                  titleSize="3xl"
                  titleClassname="md:text-4xl"
                  titleFont="bold"
                  descriptionSize="sm"
                  descriptionClassname="tracking tracking-normal line-clamp-2 md:line-clamp-3 md:text-base"
                  isTruncate={false}
                  isLink={false}
                >
                  <AppDetailDeveloper data={app} />
                </AppTitleWithDescription>
                <span className="flex w-full items-end justify-between pr-4">
                  <AppDetailDeveloper data={app} className="sm:hidden" />
                  <AppLaunchButton
                    app_url={app.app_url}
                    className="hidden max-w-44 px-6 py-1 sm:flex sm:w-32 md:w-40"
                  />
                </span>
              </div>
            </div>
            <AppDetailInfo data={app} {...ratingData} className="py-2" />
            <AppLaunchButton
              app_url={app.app_url}
              className="mx-auto w-full max-w-xl sm:hidden"
            />
          </div>
          <div className="flex w-full flex-col lg:flex-row lg:space-x-4">
            <div className="flex flex-1 flex-col space-y-6">
              <AppDetailScreenshots />
              <AppDetailIntroduction data={app.introduction} />
              <AppDetailReviews {...ratingData} />
              {/* TODO: HANDLE LOADING */}
              <Suspense fallback={<div>Loading...</div>}>
                <AppDetailCommentSection
                  allComments={allComments}
                  app_id={app.app_id}
                  c_order={c_order}
                  orderBy={orderBy}
                />
              </Suspense>
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
