"use client"

import { useRef, useState } from "react"
import { ChevronDown, ChevronRight, FlagTriangleRight } from "lucide-react"
import moment from "moment"

import { Apps, Developers, Profiles } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useClickOutside from "@/hooks/use-click-out-side"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ReportDialog } from "@/components/feedback-report/report-dialog"

import { UserHoverCard } from "./user-hover-card"

type AppDetailSubInfoProps = {
  app_url: Apps["app_url"]
  pricing: Apps["pricing"]
  developers?: Developers[]
  app_author_profile: Profiles
  updated_at: Apps["updated_at"]
  copy_right: Apps["copy_right"]
  full_name: Profiles["full_name"]
  avatar_url: Profiles["avatar_url"]
}

export const AppDetailSubInfo: React.FC<AppDetailSubInfoProps> = ({
  app_url,
  pricing,
  copy_right,
  developers,
  app_author_profile,
  full_name: submitted_by,
  updated_at: lastUpdated,
}) => {
  const [isOpen, setIsOpen] = useState(true)
  const refCollapsible = useRef<HTMLDivElement>(null)

  // useClickOutside<HTMLDivElement>(refCollapsible, () => {
  //   if (isOpen) setIsOpen(false)
  // })

  const devInfo = developers?.map((dev) => ({
    name: dev.developer_name,
    url: dev.developer_url
      ? dev.developer_url.startsWith("http://") ||
        dev.developer_url.startsWith("https://")
        ? dev.developer_url
        : `https://${dev.developer_url}`
      : null,
  }))

  return (
    <Collapsible
      open={isOpen}
      ref={refCollapsible}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between">
        <h2
          className="page-title-font text-2xl hover:cursor-pointer lg:text-base"
          onClick={() => setIsOpen(!isOpen)}
        >
          More About this App
        </h2>
        <CollapsibleTrigger asChild className="outline-none">
          <Button
            size={"xs"}
            variant="ghost"
            className="rounded-full p-0 outline-none transition-all duration-200 ease-out"
          >
            {!isOpen ? (
              <ChevronRight className="size-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="size-4" />
            )}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        {submitted_by && (
          <CollapsibleItem>
            <span className="cursor-default text-muted-foreground">
              Submitted By
            </span>
            <UserHoverCard profile={app_author_profile} />
          </CollapsibleItem>
        )}

        {app_url && (
          <CollapsibleItem>
            <span className="cursor-default text-muted-foreground">
              App Url
            </span>
            <span>
              <a
                href={app_url}
                target="_blank"
                className="underline-offset-4 hover:underline"
              >
                {app_url}
              </a>
            </span>
          </CollapsibleItem>
        )}

        {pricing && (
          <CollapsibleItem>
            <span className="cursor-default text-muted-foreground">
              Pricing
            </span>
            <span>{pricing}</span>
          </CollapsibleItem>
        )}

        <CollapsibleItem>
          <span className="cursor-default text-muted-foreground">
            Copy Right
          </span>
          <span>
            ©{" "}
            {copy_right
              ? copy_right
              : devInfo?.map((dev) =>
                  dev.url ? (
                    <a
                      key={dev.name}
                      href={dev.url}
                      target="_blank"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {dev.name}{" "}
                    </a>
                  ) : (
                    <span key={dev.name}>{dev.name} </span>
                  )
                )}
          </span>
        </CollapsibleItem>

        <CollapsibleItem>
          <span className="cursor-default text-muted-foreground">
            Last Updated
          </span>
          <span>{moment(lastUpdated).fromNow()}</span>
        </CollapsibleItem>

        <CollapsibleItem className="group">
          <ReportDialog reportType="app">
            <span className="text-muted-foreground transition-all duration-200 ease-out group-hover:text-red-500">
              Report this app
            </span>
            <FlagTriangleRight
              aria-hidden="true"
              className="size-4 text-muted-foreground opacity-0 transition-all duration-200 ease-out group-hover:text-red-500 group-hover:opacity-100"
            />
          </ReportDialog>
        </CollapsibleItem>
      </CollapsibleContent>
    </Collapsible>
  )
}

const CollapsibleItem = ({
  children,
  className,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-md px-4 py-2 text-sm hover:bg-muted-foreground/20",
        className
      )}
    >
      {children}
    </div>
  )
}
