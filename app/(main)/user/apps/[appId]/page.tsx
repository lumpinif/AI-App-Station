import { redirect } from "next/navigation"
import { getUserData } from "@/server/auth"
import { GetAppByUserId } from "@/server/data/supabase"
import { Sparkle } from "lucide-react"
import { toast } from "sonner"

import TitleForm from "./_components/title-form"

type SubmittedAppIdPageProps = {
  params: { appId: string }
}

const SubmittedAppIdPage = async ({ params }: SubmittedAppIdPageProps) => {
  const {
    data: { user },
  } = await getUserData()

  if (!user) {
    return redirect("/login")
  }

  const { app, error } = await GetAppByUserId(params.appId, user.id)

  if (!app) {
    return redirect("/ai-apps")
  }

  if (error) toast.error(error.message)

  const requiredFields = [
    app.title,
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
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">{app.title} - App Setup</h1>
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
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="">
          <div className="flex items-center gap-x-2">
            <Sparkle />
            <h2 className="text-xl">Customize the app you submitted</h2>
          </div>
          <TitleForm initialData={app} appId={app.app_id} />
        </div>
      </div>
    </div>
  )
}

export default SubmittedAppIdPage
