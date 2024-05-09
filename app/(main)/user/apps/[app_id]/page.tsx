import { Suspense } from "react"
import { redirect } from "next/navigation"
import { getUserData, getUserSession } from "@/server/auth"
import {
  getAllCategories,
  GetAppByAppIdUserId,
  getAppIconFileName,
  getAppIconUrl,
  getScreenshotsFileNames,
  getScreenshotsPublicUrls,
} from "@/server/data/supabase-actions"
import { Loader2 } from "lucide-react"
import { JSONContent } from "novel"

import { cn } from "@/lib/utils"
import { PageTitle } from "@/components/layout/page-title"

import AppCategoriesForm from "./_components/forms/app-categories-form"
import { AppDevelopersForm } from "./_components/forms/app-developers-form"
import { AppIconForm } from "./_components/forms/app-icon-form"
import { AppIntroductionForm } from "./_components/forms/app-introduction-form"
import { AppPublishButton } from "./_components/forms/app-publish-button"
import { AppScreenshotsForm } from "./_components/forms/app-screenshots-form"
import { AppSubInfoForm } from "./_components/forms/app-sub-info-form"
import { AppTitleDescriptionUrlForms } from "./_components/forms/app-title-description-url-form"
import { InfoPopover } from "./_components/forms/info-popover"

type SubmittedAppIdPageProps = {
  params: { app_id: string }
}

const SubmittedAppIdPage = async ({ params }: SubmittedAppIdPageProps) => {
  const {
    data: { user },
    error: getUserDataError,
  } = await getUserData()

  const {
    data: { session },
  } = await getUserSession()

  // TODO: HANDLE ERROR
  if (!user) {
    return redirect("/signin")
  }

  if (getUserDataError) {
    console.error(getUserDataError)
    return redirect("/ai-apps")
  }

  const { app, error } = await GetAppByAppIdUserId(params.app_id, user.id)

  if (!app) {
    return redirect("/ai-apps")
  }

  if (error) console.error(error)

  const { categories, error: getAllCatError } = await getAllCategories()
  if (getAllCatError) console.error(error)

  const appIconFileName = await getAppIconFileName(
    app.app_id,
    app.submitted_by_user_id
  )

  const appIconUrl = await getAppIconUrl(
    app.app_id,
    app.submitted_by_user_id,
    appIconFileName || ""
  )

  const screenshotsFileNames = await getScreenshotsFileNames(
    app.app_id,
    app.submitted_by_user_id
  )

  const screenshotsPublicUrls = await getScreenshotsPublicUrls(
    app.app_id,
    app.submitted_by_user_id,
    screenshotsFileNames || []
  )

  const isAllFormsComplete = (): boolean => {
    return (
      !!app.app_title &&
      !!app.description &&
      !!app.categories &&
      app.categories.length > 0 &&
      !!app.developers &&
      app.developers.length > 0 &&
      !!app.introduction &&
      !!appIconUrl &&
      !!app.pricing &&
      screenshotsPublicUrls.length > 0
    )
  }

  return (
    <section className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] bg-background relative w-full items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="bg-background pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]" />

      {/* Header */}
      <div className="bg-background sticky top-0 z-30 flex items-center justify-between pb-4">
        <div className="flex items-start gap-x-2">
          <PageTitle
            title={`Editing ${app.app_title}`}
            withBorder={false}
            className="text-2xl"
          />

          <InfoPopover
            align="start"
            isQuestionIcon={false}
            iconClassName="size-3"
          >
            *Please carefully complete all information before publish the app to
            the public. Once published, you will be honored in the app detail.
          </InfoPopover>
        </div>

        {/* Submit button */}
        <div className="text-muted-foreground flex items-center justify-end gap-x-2 text-xs">
          <AppPublishButton
            isAllFieldsComplete={isAllFormsComplete()}
            app_publish_status={app.app_publish_status}
            size={"sm"}
            app_id={app.app_id}
            disabled={
              !isAllFormsComplete() || app.app_publish_status === "published"
            }
            className={cn(
              "hidden h-8 w-fit select-none text-xs sm:block",
              isAllFormsComplete() && "w-28",
              app.app_publish_status === "published" && "w-fit"
            )}
          >
            {app.app_publish_status === "published"
              ? "Published"
              : isAllFormsComplete()
                ? "Ready to Publish"
                : app.app_publish_status === "draft"
                  ? "Fill Out All Fields"
                  : app.app_publish_status === "unpublished"
                    ? "Unpublished"
                    : app.app_publish_status === "pending"
                      ? "Currently under Reviewing"
                      : isAllFormsComplete() && "Ready to Publish"}
          </AppPublishButton>
        </div>
      </div>

      {/* content */}
      <div className="relative z-20 mt-4 sm:mt-8">
        <div className="flex flex-col items-start gap-y-14 md:gap-y-16 lg:gap-y-24">
          {/* Icon Title Description */}
          <div className="flex w-full items-start space-x-6 md:space-x-10 lg:space-x-14">
            <div className="size-24 flex-none sm:size-32 md:size-40">
              <Suspense fallback={<Loader2 className="size-4 animate-spin" />}>
                <AppIconForm
                  appIconFileName={appIconFileName as string}
                  appIconPublicUrl={appIconUrl as string}
                  app_id={app.app_id}
                  app_submitted_by_user_id={app.submitted_by_user_id}
                  access_token={session?.access_token as string}
                />
              </Suspense>
            </div>
            <div className="flex h-24 w-full flex-col items-start justify-between sm:h-32 md:h-40 lg:h-44">
              <Suspense fallback={<Loader2 className="size-4 animate-spin" />}>
                <div className="flex w-full justify-between">
                  <AppTitleDescriptionUrlForms {...app} />
                </div>
              </Suspense>
            </div>
          </div>

          {/* Developers Categories */}
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            <Suspense fallback={<Loader2 className="size-4 animate-spin" />}>
              <AppDevelopersForm
                className="md:col-span-1"
                app_id={app.app_id}
                developers={app.developers}
              />
            </Suspense>
            <Suspense fallback={<Loader2 className="size-4 animate-spin" />}>
              <AppCategoriesForm
                className="md:col-span-1"
                app_id={app.app_id}
                categories={app.categories}
                allCategories={categories}
              />
            </Suspense>
          </div>

          {/* Subinfo */}
          <Suspense fallback={<Loader2 className="size-4 animate-spin" />}>
            <AppSubInfoForm {...app} />
          </Suspense>

          {/* Screenshots */}
          <Suspense fallback={<Loader2 className="size-4 animate-spin" />}>
            <AppScreenshotsForm
              screenshotsFileNames={screenshotsFileNames || []}
              screenshotsPublicUrls={screenshotsPublicUrls || []}
              app_id={app.app_id}
              app_submitted_by_user_id={app.submitted_by_user_id}
              access_token={session?.access_token as string}
            />
          </Suspense>

          {/* Introduction */}
          <AppIntroductionForm
            app_id={app.app_id}
            introduction={app.introduction as JSONContent}
          />

          {/* Submit */}
          <div className="flex w-full justify-end sm:hidden">
            <AppPublishButton
              isAllFieldsComplete={isAllFormsComplete()}
              app_publish_status={app.app_publish_status}
              app_id={app.app_id}
              disabled={
                !isAllFormsComplete() || app.app_publish_status === "published"
              }
              className="w-full select-none"
            >
              {app.app_publish_status === "published"
                ? "Published"
                : isAllFormsComplete()
                  ? "Ready to Publish"
                  : app.app_publish_status === "draft"
                    ? "Fill Out All Fields"
                    : app.app_publish_status === "unpublished"
                      ? "Unpublished"
                      : app.app_publish_status === "pending"
                        ? "Currently under Reviewing"
                        : isAllFormsComplete() && "Ready to Publish"}
            </AppPublishButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SubmittedAppIdPage
