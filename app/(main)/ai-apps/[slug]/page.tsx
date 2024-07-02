import { Suspense } from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getUser } from "@/server/auth"
import { getAppBySlug } from "@/server/queries/supabase/apps/apps-actions"
import {
  getScreenshotsFileNames,
  getScreenshotsPublicUrls,
} from "@/server/queries/supabase/storage"

import { SearchParams } from "@/types/data-table"
import { App_Comments, AppDetails } from "@/types/db_tables"
import { siteConfig } from "@/config/site"
import { cn, getSiteUrl } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import LoadingFallback from "@/components/shared/loading-fallback"

import { AppIcon } from "../_components/cards/_components/app-icon"
import { AppTitleWithDescription } from "../_components/cards/_components/app-title-description"
import { AppCommentsBadge } from "../_components/cards/app-comments-badge"
import { AppDetailBookmarkButton } from "./_components/app-detail-bookmark-button"
import { AppDetailCarousel } from "./_components/app-detail-carousel"
import { AppDetailIntroduction } from "./_components/app-detail-introduction"
import { AppDetailLikeButton } from "./_components/app-detail-like-button"
import { AppDetailRelevantApps } from "./_components/app-detail-relevant-apps"
import { AppDetailReviews } from "./_components/app-detail-reviews"
import { AppDetailScreenshots } from "./_components/app-detail-screenshots"
import { AppDetailShare } from "./_components/app-detail-share"
import { AppDetailSubInfo } from "./_components/app-detail-sub-info"
import { AppLaunchButton } from "./_components/app-launch-button"
import AppDetailCommentSection from "./_components/comment/app-detail-comment-section"

export type AppPageProps = {
  params: { slug: string }
  searchParams: SearchParams
}

// Get the app
async function fetchAppBySlug(params: { slug: string }) {
  const {
    app,
    ratingData,
    error: getAppBySlugError,
  } = await getAppBySlug(params.slug)

  return { app, ratingData, getAppBySlugError }
}

// Get screenshots of the app
async function fetchAppScreenshots(app: AppDetails) {
  const screenshotsFileNames = await getScreenshotsFileNames(
    app.app_id,
    app.app_slug,
    app.submitted_by_user_id
  )

  const screenshotsPublicUrls = await getScreenshotsPublicUrls(
    app.app_id,
    app.app_slug,
    app.submitted_by_user_id,
    screenshotsFileNames || []
  )

  return screenshotsPublicUrls
}

export async function generateMetadata({
  params,
  searchParams,
}: AppPageProps): Promise<Metadata> {
  const { app } = await fetchAppBySlug({ slug: params.slug })

  if (!app) {
    return {}
  }

  const screenshotsPublicUrls = await fetchAppScreenshots(app)

  const app_title = app?.app_title
  const app_icon_src = app?.app_icon_src
  const app_description = app?.description
  const app_slug = app?.app_slug
  const submitter = app?.profiles.full_name || app?.profiles.user_name

  const site_icon_src = app_icon_src || siteConfig.siteIcon

  const ogImage = screenshotsPublicUrls[0] || siteConfig.ogImage

  return {
    title: `${app_title} - ${app_description}`,
    description: `${app_title} - ${app_description}`,
    icons: {
      icon: [
        {
          url: site_icon_src,
          href: site_icon_src,
        },
      ],
    },
    openGraph: {
      title: `${app_title}`,
      description: `${app_title} - ${app_description}`,
      type: "article",
      url: getSiteUrl() + `/ai-apps/${app_slug}`,
      images: [
        {
          url: ogImage,
          width: 1400,
          height: 800,
          alt: `${siteConfig.name} | ${app_title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${app_title} - ${app_description}`,
      description: `${app_description}`,
      images: [ogImage],
      creator: `Submitted by ${submitter}`,
    },
  }
}

export default async function AiAppsMainPage({
  params,
  searchParams,
}: AppPageProps) {
  const c_order = searchParams?.c_order as "asc" | "desc" | undefined
  const orderBy = searchParams?.orderBy as keyof App_Comments | undefined

  const { user } = await getUser()

  const { app, ratingData, getAppBySlugError } = await fetchAppBySlug({
    slug: params.slug,
  })

  // TODO: REFACTOR ERROR HANDLING
  if (getAppBySlugError) {
    console.error(getAppBySlugError)
    return notFound()
  }
  //TODO: REFACTOR HANDLING APP NOT FOUND
  if (!app) {
    notFound()
  }

  // TODO: ADD HERO FEATURED LOGIC PROP AND THE IMAGE

  const screenshotsPublicUrls = await fetchAppScreenshots(app)

  return (
    <main
      className="mb-8 mt-4 flex flex-col space-y-4 px-1 pb-8 sm:px-2 md:mt-6 lg:mt-8 xl:mt-12"
      suppressHydrationWarning
    >
      {/* {app.is_featured && (
        <div
          className={cn("md:hidden", app.is_featured && "h-20 w-full sm:h-32")}
        >
          <AppDetailHeroImage />
        </div>
      )} */}
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
                  isLink={false}
                  titleSize="3xl"
                  titleFont="bold"
                  isTruncate={false}
                  descriptionSize="sm"
                  titleClassname="md:text-4xl leading-[0.8]"
                  className="w-full items-start text-ellipsis tracking-tight sm:tracking-wide md:gap-2 lg:gap-3 sm:[&>*:nth-child(1)]:hover:no-underline"
                  descriptionClassname="tracking tracking-normal line-clamp-2 md:line-clamp-3 md:text-base"
                />
                <div
                  className={cn(
                    "h-fit items-center gap-x-2 text-muted-foreground",
                    buttonVariants({
                      variant: "outline",
                      size: "label",
                      className:
                        "hidden w-fit shadow-sm hover:shadow-md dark:shadow-top sm:flex",
                    })
                  )}
                >
                  <AppDetailShare {...app} />
                </div>
              </div>
              <div className="flex w-full items-end justify-between pr-4">
                <div className="flex items-center gap-x-2 md:gap-x-6">
                  <AppLaunchButton
                    app_url={app.app_url}
                    className="hidden max-w-44 px-6 py-1 sm:flex sm:w-32 md:w-40"
                  />
                  <span className="flex items-center gap-x-2 md:gap-x-4">
                    <AppCommentsBadge
                      app_slug={app.app_slug}
                      comments_count={app.comments_count}
                    />
                    <AppDetailLikeButton
                      user={user}
                      app_id={app.app_id}
                      data={app.app_likes}
                    />
                    <AppDetailBookmarkButton
                      user={user}
                      app_id={app.app_id}
                      data={app.app_bookmarks}
                    />
                    <span className="flex sm:hidden">
                      <AppDetailShare {...app} />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <AppDetailCarousel data={app} {...ratingData} className="py-4" />

          {/* Mobile Launch Button*/}
          <AppLaunchButton
            app_url={app.app_url}
            className="mx-auto w-full max-w-xl border dark:border-0 dark:shadow-outline dark:outline-none sm:hidden"
          />
        </div>
        <div className="flex w-full flex-col xl:flex-row xl:space-x-4">
          <div className="flex flex-1 flex-col space-y-6 md:space-y-12 lg:space-y-16">
            <AppDetailScreenshots
              screenshotsPublicUrls={screenshotsPublicUrls || []}
            />

            <AppDetailIntroduction introduction={app.introduction} />

            <AppDetailReviews {...ratingData} />

            <Suspense fallback={<LoadingFallback />}>
              <AppDetailCommentSection
                user={user}
                app_id={app.app_id}
                c_order={c_order}
                orderBy={orderBy}
              />
            </Suspense>
          </div>
          <div className="mt-6 flex flex-col space-y-6 md:space-y-12 lg:space-y-16 xl:mt-0">
            <AppDetailSubInfo
              {...app}
              {...app.profiles}
              {...app.developers}
              app_author_profile={app.profiles}
            />
            <AppDetailRelevantApps app={app} />
          </div>
        </div>
      </div>
    </main>
  )
}
