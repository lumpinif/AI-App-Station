import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getAllComments, getAppBySlug } from "@/server/data"
import {
  getScreenshotsFileNames,
  getScreenshotsPublicUrls,
} from "@/server/data/supabase"
import { Bookmark, ExternalLink, ThumbsUp } from "lucide-react"

import { Comment } from "@/types/db_tables"
import { cn } from "@/lib/utils"

import { AppCommentsBadge } from "../_components/cards/_components/app-comments-badge"
import { AppIcon } from "../_components/cards/_components/app-icon"
import { AppTitleWithDescription } from "../_components/cards/_components/app-title-description"
import { AppDetailBookmark } from "./_components/app-detail-bookmark"
import AppDetailCommentSection from "./_components/app-detail-comment-section"
import { AppDetailHeroImage } from "./_components/app-detail-hero-image"
import { AppDetailInfo } from "./_components/app-detail-info"
import { AppDetailIntroduction } from "./_components/app-detail-introduction"
import { AppDetailLikeButton } from "./_components/app-detail-like-button"
import { AppDetailReviews } from "./_components/app-detail-reviews"
import { AppDetailScreenshots } from "./_components/app-detail-screenshots"
import { AppDetailShare } from "./_components/app-detail-share"
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

  // TODO: ADD HERO FEATURED LOGIC PROP AND THE IMAGE
  // mt-16 sm:mt-4
  const isHeroFeatured = true

  // Get screenshots
  const screenshotsFileNames = await getScreenshotsFileNames(
    app.app_slug,
    app.submitted_by_user_id
  )

  const screenshotsPublicUrls = await getScreenshotsPublicUrls(
    app.app_slug,
    app.submitted_by_user_id,
    screenshotsFileNames || []
  )

  return (
    <main
      className="mt-4 flex flex-col space-y-4 md:mt-6 lg:mt-8 xl:mt-12"
      suppressHydrationWarning
    >
      {app.is_featured && (
        <div
          className={cn("md:hidden", app.is_featured && "h-20 w-full sm:h-32")}
        >
          <AppDetailHeroImage />
        </div>
      )}
      <div className="flex flex-col items-start space-y-6 md:space-y-12 lg:space-y-16">
        <div className="flex w-full flex-col items-start space-y-6 md:space-y-12 lg:space-y-16">
          <div className="flex w-full items-start space-x-4 md:space-x-8 lg:space-x-14">
            <div className="size-24 flex-none sm:size-32 md:size-40">
              <AppIcon
                {...app}
                size={"full"}
                isLink={false}
                externalLink={app.app_url}
              />
            </div>
            <div className="flex h-24 w-full flex-col items-start justify-between sm:h-32 md:h-40">
              <div className="flex w-full justify-between">
                <AppTitleWithDescription
                  {...app}
                  className=" w-full items-start text-ellipsis tracking-tight sm:tracking-wide md:gap-2 lg:gap-3 sm:[&>*:nth-child(1)]:hover:no-underline"
                  titleSize="3xl"
                  titleClassname="md:text-4xl leading-[0.8]"
                  titleFont="bold"
                  descriptionSize="sm"
                  descriptionClassname="tracking tracking-normal line-clamp-2 md:line-clamp-3 md:text-base"
                  isTruncate={false}
                  isLink={false}
                />
                <span className="flex h-fit items-center space-x-2 pr-2 md:pr-4">
                  <AppDetailShare {...app} />
                </span>
              </div>
              <span className="flex w-full items-end justify-between pr-4">
                <span className="flex items-center space-x-2 md:space-x-6">
                  <AppLaunchButton
                    app_url={app.app_url}
                    className="hidden max-w-44 px-6 py-1 sm:flex sm:w-32 md:w-40"
                  />
                  <span className="flex items-center space-x-2 md:space-x-4">
                    <AppCommentsBadge
                      app_slug={app.app_slug}
                      comments_count={app.comments_count}
                    />
                    <AppDetailLikeButton
                      data={app.app_likes}
                      app_id={app.app_id}
                    />
                    <AppDetailBookmark
                      app_id={app.app_id}
                      data={app.app_bookmarks}
                    />
                    {/* <Star className="size-4 stroke-1 text-muted-foreground md:size-5" /> */}
                  </span>
                </span>
              </span>
            </div>
          </div>
          <AppDetailInfo data={app} {...ratingData} className="py-4" />
          <AppLaunchButton
            app_url={app.app_url}
            className="mx-auto w-full max-w-xl sm:hidden"
          />
        </div>
        <div className="flex w-full flex-col xl:flex-row xl:space-x-4">
          <div className="flex flex-1 flex-col space-y-6 md:space-y-12 lg:space-y-16">
            <AppDetailScreenshots
              screenshotsPublicUrls={screenshotsPublicUrls || []}
            />
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
          <div className="mt-2 xl:mt-0">
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
  )
}
