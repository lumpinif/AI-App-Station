import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getUserData, getUserSession } from "@/server/auth"
import {
  getAllCategories,
  getAppByAppIdUserId,
  getAppIconFileName,
  getAppIconUrl,
  getScreenshotsFileNames,
  getScreenshotsPublicUrls,
} from "@/server/data/supabase-actions"

import { Apps } from "@/types/db_tables"

import { AppEditor } from "./_components/app-editor"
import { AppEditingPageWrapper } from "./_components/app-editor-wrapper"

type SubmittedAppIdPageProps = {
  params: { app_id: string }
}

async function fetchAppByAppIdUserId(
  app_id: Apps["app_id"],
  user_id: Apps["submitted_by_user_id"]
) {
  const { app, error } = await getAppByAppIdUserId(app_id, user_id)

  return { app, error }
}

async function fetchUser() {
  const {
    data: { user },
    error: getUserDataError,
  } = await getUserData()

  return { user, getUserDataError }
}

export async function generateMetadata({
  params,
}: SubmittedAppIdPageProps): Promise<Metadata> {
  const { user } = await fetchUser()

  if (!user) {
    return {}
  }

  const { app } = await fetchAppByAppIdUserId(params.app_id, user.id)

  if (!app) {
    return {}
  }

  const app_title = app?.app_title

  return {
    title: `Submitting - ${app_title}`,
    description: `In the editor mode for ${app_title}`,
  }
}

const SubmittedAppIdPage = async ({ params }: SubmittedAppIdPageProps) => {
  const { user, getUserDataError } = await fetchUser()

  const {
    data: { session },
  } = await getUserSession()

  // TODO: HANDLE ERROR
  if (!user?.id) {
    return redirect("/signin")
  }

  if (getUserDataError) {
    console.error(getUserDataError)
    return redirect("/ai-apps")
  }

  const { app, error } = await getAppByAppIdUserId(params.app_id, user.id)

  if (!app) {
    return redirect("/ai-apps")
  }

  if (error) console.error(error)

  const { categories, error: getAllCatError } = await getAllCategories()
  if (getAllCatError) console.error(getAllCatError)

  const appIconFileName = await getAppIconFileName(
    app.app_id,
    app.app_slug,
    app.submitted_by_user_id
  )

  const appIconUrl = await getAppIconUrl(
    app.app_id,
    app.app_slug,
    app.submitted_by_user_id,
    appIconFileName || ""
  )

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
    <AppEditingPageWrapper app={app} isAllFormsComplete={isAllFormsComplete}>
      <AppEditor
        app={app}
        user={user}
        session={session}
        appIconUrl={appIconUrl}
        categories={categories}
        appIconFileName={appIconFileName}
        screenshotsFileNames={screenshotsFileNames}
        screenshotsPublicUrls={screenshotsPublicUrls}
      />
    </AppEditingPageWrapper>
  )
}

export default SubmittedAppIdPage
