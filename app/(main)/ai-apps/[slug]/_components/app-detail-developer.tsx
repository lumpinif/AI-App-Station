import Link from "next/link"

import { AppDetails } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type AppDetailDeveloperProps = {
  data: AppDetails
  className?: string
}

export const AppDetailDeveloper: React.FC<AppDetailDeveloperProps> = ({
  data: app,
  className,
}) => {
  return (
    <>
      <span
        className={cn(
          "flex space-x-1 text-sm text-muted-foreground",
          className
        )}
      >
        {app.developers && app.developers.length > 0 ? (
          app.developers.map((dev) => (
            <span
              key={dev.developer_name}
              className="flex items-center gap-x-1  "
            >
              <Badge variant={"secondary"}>
                {dev.developer_slug ? (
                  <Link href={dev.developer_slug} className="font-normal">
                    {dev.developer_name}
                  </Link>
                ) : (
                  <span className="font-normal">{dev.developer_name}</span>
                )}
              </Badge>
            </span>
          ))
        ) : (
          <Badge variant={"secondary"}>
            <span>Unknow Developer</span>
          </Badge>
        )}
      </span>
    </>
  )
}
