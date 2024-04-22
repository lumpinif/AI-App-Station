import { redirect } from "next/navigation"
import { getUserData, getUserSession } from "@/server/auth"
import { GetAppByAppIdUserId } from "@/server/data/supabase"

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

  const requiredFields = [
    app.app_title,
    app.app_url,
    app.introduction,
    app.description,
    app.pricing,
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields}/${totalFields})`

  const isComplete = requiredFields.every(Boolean)

  return (
    // <div className="flex flex-col gap-10 p-6">
    //   <div className="flex items-center justify-between">
    //     <div className="flex flex-col gap-y-2">
    //       <h1 className="text-xl">
    //         Continue on submitting -{" "}
    //         <span className="text-3xl font-medium">{app.app_title}</span>
    //       </h1>
    //       <span className="text-sm text-muted-foreground">
    //         Complete all fields {completionText}
    //       </span>
    //     </div>
    //     <Actions
    //         disabled={!isComplete}
    //         courseId={params.courseId}
    //         isPublished={course.isPublished}
    //       />
    //   </div>

    //   <Suspense>
    //     <AppContinueSubmitForm initialData={app} appId={app.app_id} />
    //   </Suspense>
    // </div>
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col items-start space-y-6 md:space-y-12 lg:space-y-16">
          <div className="flex w-full flex-col items-start space-y-6 md:space-y-12 lg:space-y-16">
            <div className="flex w-full items-start space-x-4 md:space-x-8 lg:space-x-12">
              <div className="size-28 flex-none sm:size-32 md:size-40 lg:size-44">
                <AppIconForm
                  app_id={app.app_id}
                  app_title={app.app_title}
                  app_submitted_by_user_id={app.submitted_by_user_id}
                  access_token={session?.access_token}
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
          </div>
          <div className="flex w-full flex-col">
            <div className="flex flex-1 flex-col space-y-6 md:space-y-12 lg:space-y-16">
              <AppScreenshotsForm />
              <AppIntroductionForm />
            </div>
            <div className="mt-6">
              <AppSubInfoForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubmittedAppIdPage
