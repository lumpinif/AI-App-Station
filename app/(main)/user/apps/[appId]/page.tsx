import { Suspense } from "react"
import { redirect } from "next/navigation"
import { getUserData } from "@/server/auth"
import { GetAppsByUserId } from "@/server/data/supabase"

import AppContinueSubmitForm from "./_components/app-continue-submit-form"

type SubmittedAppIdPageProps = {
  params: { appId: string }
}

const SubmittedAppIdPage = async ({ params }: SubmittedAppIdPageProps) => {
  const {
    data: { user },
    error: getUserDataError,
  } = await getUserData()

  if (!user || getUserDataError) {
    return redirect("/login")
  }

  const { app, error } = await GetAppsByUserId(params.appId, user.id)

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
    <div className="flex flex-col gap-10 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-xl">
            Continue on submitting -{" "}
            <span className="text-3xl font-medium">{app.app_title}</span>
          </h1>
          <span className="text-sm text-muted-foreground">
            Complete all fields {completionText}
          </span>
        </div>
        {/* <Actions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
          /> */}
      </div>

      <Suspense>
        <AppContinueSubmitForm initialData={app} appId={app.app_id} />
      </Suspense>
    </div>
  )
}

export default SubmittedAppIdPage
