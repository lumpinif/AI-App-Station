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
import { Separator } from "@/components/ui/separator"
import BackButton from "@/components/shared/back-button"

import { AppApprovalSubmitButton } from "./_components/forms/app-approval-submit-button"
import AppCategoriesForm from "./_components/forms/app-categories-form"
import { AppDevelopersForm } from "./_components/forms/app-developers-form"
import { AppIconForm } from "./_components/forms/app-icon-form"
import { AppIntroductionForm } from "./_components/forms/app-introduction-form"
import { AppScreenshotsForm } from "./_components/forms/app-screenshots-form"
import { AppTitleWithDescriptionForm } from "./_components/forms/app-title-description-form"
import { InfoPopover } from "./_components/forms/info-modal"

type SubmittedAppIdPageProps = {
  params: { appId: string }
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

  const { app, error } = await GetAppByAppIdUserId(params.appId, user.id)

  if (!app) {
    return redirect("/ai-apps")
  }

  if (error) console.error(error)

  const { categories, error: getAllCatError } = await getAllCategories()
  if (getAllCatError) console.error(error)

  const appIconFileName = await getAppIconFileName(
    app.app_slug,
    app.submitted_by_user_id
  )

  const appIconUrl = await getAppIconUrl(
    app.app_slug,
    app.submitted_by_user_id,
    appIconFileName || ""
  )

  const screenshotsFileNames = await getScreenshotsFileNames(
    app.app_slug,
    app.submitted_by_user_id
  )

  const screenshotsPublicUrls = await getScreenshotsPublicUrls(
    app.app_slug,
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
      screenshotsPublicUrls.length > 0
    )
  }

  return (
    <section className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] bg-background relative w-full items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="bg-background pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]" />
      <div className="relative z-20 flex items-center justify-between border-b">
        <div className="flex items-center gap-x-2">
          <div className="sm:w-24">
            <BackButton />
          </div>
          <h1 className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-4 text-center text-lg font-bold text-transparent">
            Editing {app.app_title}
          </h1>
        </div>

        <span className="text-muted-foreground flex text-xs">
          {/* Submit button */}
          <div className="flex justify-end">
            <AppApprovalSubmitButton
              ready_to_submit={app.ready_to_publish}
              size={"sm"}
              app_id={app.app_id}
              disabled={!isAllFormsComplete() || app.ready_to_publish}
              className={cn(
                "hidden h-8 w-20 select-none text-xs sm:block",
                isAllFormsComplete() && "w-28",
                app.ready_to_publish && "w-32"
              )}
            >
              {app.ready_to_publish
                ? "Waiting for Approval"
                : isAllFormsComplete()
                  ? "Ready to Publish"
                  : "Publish"}
            </AppApprovalSubmitButton>
            <div className="sm:hidden">
              <InfoPopover>
                *Please carefully complete all information before submitting for
                app review.
              </InfoPopover>
            </div>
          </div>
        </span>
      </div>

      {/* content */}
      <div className="relative z-20 mt-6 lg:container sm:mt-12">
        <div className="flex flex-col items-start space-y-8 sm:mt-8 md:mt-10 md:space-y-14 lg:space-y-20">
          {/* Icon Title Description */}
          <div className="flex w-full items-start space-x-6 md:space-x-10 lg:space-x-14">
            <div className="size-24 flex-none sm:size-32 md:size-40">
              <Suspense fallback={<Loader2 className="size-4 animate-spin" />}>
                <AppIconForm
                  appIconFileName={appIconFileName as string}
                  appIconPublicUrl={appIconUrl as string}
                  app_slug={app.app_slug}
                  app_submitted_by_user_id={app.submitted_by_user_id}
                  access_token={session?.access_token as string}
                />
              </Suspense>
            </div>
            <div className="flex h-24 w-full flex-col items-start justify-between sm:h-32 md:h-40 lg:h-44">
              <Suspense fallback={<Loader2 className="size-4 animate-spin" />}>
                <div className="flex w-full justify-between">
                  <AppTitleWithDescriptionForm {...app} />
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
          {/* Screenshots */}
          <Suspense fallback={<Loader2 className="size-4 animate-spin" />}>
            <AppScreenshotsForm
              screenshotsFileNames={screenshotsFileNames || []}
              screenshotsPublicUrls={screenshotsPublicUrls || []}
              app_slug={app.app_slug}
              app_submitted_by_user_id={app.submitted_by_user_id}
              access_token={session?.access_token as string}
            />
          </Suspense>
          {/* Introduction */}
          <AppIntroductionForm
            app_id={app.app_id}
            introduction={app.introduction as JSONContent}
          />
          {/* Subinfo */}
          {/* <div className="mt-6">
            <AppSubInfoForm />
          </div> */}
          {/* Submit */}
          <div className="flex w-full justify-end sm:hidden">
            <AppApprovalSubmitButton
              ready_to_submit={app.ready_to_publish}
              app_id={app.app_id}
              disabled={!isAllFormsComplete() || app.ready_to_publish}
              className="w-full select-none"
            >
              {app.ready_to_publish
                ? "Waiting for Approval"
                : isAllFormsComplete()
                  ? "Ready to Publish"
                  : "Publish"}
            </AppApprovalSubmitButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SubmittedAppIdPage
