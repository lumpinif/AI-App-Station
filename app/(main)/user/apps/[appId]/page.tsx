import { redirect } from "next/navigation"
import { getUserData, getUserSession } from "@/server/auth"
import {
  GetAppByAppIdUserId,
  getAppIconFileName,
  getAppIconUrl,
  getScreenshotsFileNames,
  getScreenshotsPublicUrls,
} from "@/server/data/supabase"

import BackButton from "@/components/shared/back-button"

import AppCategoriesForm from "./_components/forms/app-categories-form"
import { AppDevelopersForm } from "./_components/forms/app-developers-form"
import { AppIconForm } from "./_components/forms/app-icon-form"
import { AppIntroductionForm } from "./_components/forms/app-introduction"
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
    <section className="flex flex-col space-y-6">
      <div className="flex flex-col border-b pb-4">
        <div className="flex items-center space-x-4">
          <BackButton />
          <div className="flex flex-col">
            <h1 className="text-base">
              Continue on submitting -{" "}
              <span className="text-base font-medium">{app.app_title}</span>
            </h1>
            <span className="text-xs text-muted-foreground">
              You need to Complete all fields before you can submit
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col space-y-4">
        <div className="flex flex-col items-start space-y-6 md:space-y-12 lg:space-y-16">
          <div className="flex w-full flex-col items-start space-y-6 md:space-y-12 lg:space-y-16">
            <div className="flex w-full items-start space-x-4 md:space-x-8">
              <div className="size-28 flex-none sm:size-32 md:size-40">
                <AppIconForm
                  appIconFileName={appIconFileName as string}
                  appIconPublicUrl={appIconUrl as string}
                  app_slug={app.app_slug}
                  app_submitted_by_user_id={app.submitted_by_user_id}
                  access_token={session?.access_token as string}
                />
              </div>
              <div className="flex h-28 w-full flex-col items-start justify-between sm:h-32 md:h-40 lg:h-44">
                <div className="flex w-full justify-between">
                  <AppTitleWithDescriptionForm {...app} />
                </div>
              </div>
            </div>
            <AppDevelopersForm
              app_id={app.app_id}
              developers={app.developers}
            />
            <AppCategoriesForm
              app_id={app.app_id}
              categories={app.categories}
            />
          </div>
          <div className="flex w-full flex-col">
            <div className="flex flex-1 flex-col space-y-6 md:space-y-12 lg:space-y-16">
              <AppScreenshotsForm
                screenshotsFileNames={screenshotsFileNames || []}
                screenshotsPublicUrls={screenshotsPublicUrls || []}
                app_slug={app.app_slug}
                app_submitted_by_user_id={app.submitted_by_user_id}
                access_token={session?.access_token as string}
              />
              <AppIntroductionForm />
            </div>
            <div className="mt-6">
              <AppSubInfoForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SubmittedAppIdPage
