import { Suspense } from "react"
import { redirect } from "next/navigation"
import { getUserData, getUserSession } from "@/server/auth"
import {
  GetAppByAppIdUserId,
  getAppIconFileName,
  getAppIconUrl,
  getScreenshotsFileNames,
  getScreenshotsPublicUrls,
} from "@/server/data/supabase"
import { Loader2 } from "lucide-react"
import { JSONContent } from "novel"

import BackButton from "@/components/shared/back-button"

import AppCategoriesForm from "./_components/forms/app-categories-form"
import { AppDevelopersForm } from "./_components/forms/app-developers-form"
import { AppIconForm } from "./_components/forms/app-icon-form"
import { AppIntroductionForm } from "./_components/forms/app-introduction-form"
import { AppScreenshotsForm } from "./_components/forms/app-screenshots-form"
import { AppSubInfoForm } from "./_components/forms/app-sub-info-form"
import { AppTitleWithDescriptionForm } from "./_components/forms/app-title-description-form"

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

  return (
    <section>
      <div className="flex flex-col border-b pb-1">
        <div className="flex items-center space-x-4">
          <BackButton />
          <div className="flex w-full items-center justify-between">
            <h1 className="text-xs text-muted-foreground">
              Continue submitting - <span>{app.app_title}</span>
            </h1>
            <span className="hidden text-xs text-muted-foreground sm:flex">
              Complete all required fields
            </span>
          </div>
        </div>
      </div>

      <div className="container mt-6 flex flex-col items-start space-y-8 sm:mt-8 md:mt-10 md:space-y-14 lg:space-y-20">
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
        <div className="mt-6">
          <AppSubInfoForm />
        </div>
      </div>
    </section>
  )
}

export default SubmittedAppIdPage
