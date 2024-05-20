import { Suspense } from "react"
import { Session, User } from "@supabase/supabase-js"
import { Loader2 } from "lucide-react"
import { JSONContent } from "novel"

import { AppDetails, Categories } from "@/types/db_tables"

import AppCategoriesForm from "./forms/app-categories-form"
import AppDevelopersForm from "./forms/app-developers-form"
import { AppIconForm } from "./forms/app-icon-form"
import { AppScreenshotsForm } from "./forms/app-screenshots-form"
import { AppSubInfoForm } from "./forms/app-sub-info-form"
import { AppTitleDescriptionUrlForms } from "./forms/app-title-description-url-form"
import { AppIntroductionEditor } from "./introduction-editor/app-introduction-editor"

type AppEditorProps = {
  app: AppDetails
  user: User
  session: Session | null
  appIconUrl: string
  categories: Categories[] | null | undefined
  appIconFileName: string | null
  screenshotsFileNames: string[] | null
  screenshotsPublicUrls: string[]
}

export const AppEditor: React.FC<AppEditorProps> = ({
  app,
  user,
  session,
  appIconUrl,
  categories,
  appIconFileName,
  screenshotsFileNames,
  screenshotsPublicUrls,
}) => {
  return (
    <main className="relative z-20 mt-4 sm:mt-8">
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
        <AppIntroductionEditor
          app_id={app.app_id}
          app_slug={app.app_slug}
          submitted_by_user_id={user.id}
          introduction={app.introduction as JSONContent}
        />
      </div>
    </main>
  )
}
