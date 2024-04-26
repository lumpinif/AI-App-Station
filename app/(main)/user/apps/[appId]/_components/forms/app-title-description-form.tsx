import { App } from "@/types/db_tables"
import { cn } from "@/lib/utils"

import DescriptionForm from "./app-description-form"
import TitleForm from "./app-title-form"

type AppTitleWithDescriptionFormProps = {
  app_id: App["app_id"]
  app_title: App["app_title"]
  description: App["description"]
}

export const AppTitleWithDescriptionForm: React.FC<
  AppTitleWithDescriptionFormProps
> = ({ app_id, app_title, description }) => {
  return (
    <div
      className={cn(
        "flex w-full min-w-0 flex-col items-start gap-1 text-ellipsis tracking-tight sm:tracking-wide md:gap-2 lg:gap-3 sm:[&>*:nth-child(1)]:hover:no-underline"
      )}
    >
      <TitleForm app_id={app_id} app_title={app_title} />
      <DescriptionForm app_id={app_id} description={description} />
    </div>
  )
}
