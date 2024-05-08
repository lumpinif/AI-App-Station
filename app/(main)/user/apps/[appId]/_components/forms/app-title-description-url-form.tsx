import { App } from "@/types/db_tables"
import { cn } from "@/lib/utils"

import DescriptionForm from "./app-description-form"
import TitleForm from "./app-title-form"
import { AppUrlForm } from "./app-url-form"

type AppTitleWithDescriptionFormProps = {
  app_id: App["app_id"]
  app_title: App["app_title"]
  description: App["description"]
  app_url: App["app_url"]
}

export const AppTitleDescriptionUrlForms: React.FC<
  AppTitleWithDescriptionFormProps
> = ({ app_id, app_title, description, app_url }) => {
  return (
    <div
      className={cn(
        "flex w-full min-w-0 flex-col items-start gap-1 text-ellipsis tracking-tight sm:tracking-wide md:gap-3 lg:gap-4 sm:[&>*:nth-child(1)]:hover:no-underline"
      )}
    >
      <div className="flex w-full flex-col sm:gap-y-2">
        <TitleForm app_id={app_id} app_title={app_title} />
        <AppUrlForm app_id={app_id} app_url={app_url} />
      </div>
      <DescriptionForm app_id={app_id} description={description} />
    </div>
  )
}
