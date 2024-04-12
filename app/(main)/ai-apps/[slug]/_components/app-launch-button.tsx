import { App } from "@/types/db_tables"
import { Button } from "@/components/ui/button"

type AppLaunchButtonProps = {
  app_url: App["app_url"]
}

export const AppLaunchButton: React.FC<AppLaunchButtonProps> = ({
  app_url,
}) => {
  const isAppUrl = app_url !== null ? true : false
  return (
    <>
      <Button
        className="mx-auto w-full max-w-lg font-semibold tracking-wide"
        asChild
      >
        {isAppUrl && (
          <a href={app_url || ""} target="_blank">
            Launch
          </a>
        )}
      </Button>
    </>
  )
}
