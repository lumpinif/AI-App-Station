import Link from "next/link"

import { Apps } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type AppLaunchButtonProps = {
  app_url: Apps["app_url"]
  className?: string
  children?: React.ReactNode
}

export const AppLaunchButton: React.FC<AppLaunchButtonProps> = ({
  app_url,
  className,
  children,
}) => {
  const isAppUrl = app_url !== null ? true : false
  return (
    <>
      <Button
        className={cn(
          "group relative h-10 rounded-md border px-6",
          className,
          isAppUrl ? "" : "cursor-not-allowed bg-muted hover:bg-muted"
        )}
        asChild
        variant={"ghost"}
      >
        {isAppUrl ? (
          <Link
            className={cn(
              "inline-flex items-center justify-center font-semibold",
              isAppUrl ? "" : ""
            )}
            href={app_url || ""}
            target="_blank"
            passHref
          >
            <span className="select-none">Launch</span>
            <div className="relative ml-1 h-5 w-5 overflow-hidden">
              <div className="absolute transition-all duration-200 group-hover:-translate-y-5 group-hover:translate-x-4">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                >
                  <path
                    d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 -translate-x-4"
                >
                  <path
                    d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </Link>
        ) : (
          <span className="select-none font-semibold">No Url Available</span>
        )}
      </Button>
    </>
  )
}
