"use client"

import { useRef, useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
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

import { UserHoverCard } from "./user-hover-card"

type AppDetailSubInfoProps = {
  full_name: Profiles["full_name"]
  created_at: Profiles["created_at"]
  avatar_url: Profiles["avatar_url"]
  updated_at: Apps["updated_at"]
  app_url: Apps["app_url"]
  pricing: Apps["pricing"]
  copy_right: Apps["copy_right"]
  developers?: Developers[]
}

export const AppDetailSubInfo: React.FC<AppDetailSubInfoProps> = ({
  full_name: submitted_by,
  created_at: user_joined,
  avatar_url,
  updated_at: lastUpdated,
  app_url,
  pricing,
  copy_right,
  developers,
}) => {
  const [isOpen, setIsOpen] = useState(false)

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
      ref={refCollapsible}
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2 xl:w-56"
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
            variant="ghost"
            size={"icon"}
            className="h-9 w-9 rounded-full p-0 outline-none transition-all duration-200 ease-out"
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
            <UserHoverCard
              avatar_url={avatar_url}
              user_joined={user_joined}
              user_name={submitted_by}
            />
          </CollapsibleItem>
        )}

        {app_url && (
          <CollapsibleItem>
            <span className="cursor-default text-muted-foreground ">
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

        <CollapsibleItem>
          <span className="cursor-default text-muted-foreground">
            Report this page
          </span>
          <span>report@aiappstation.com</span>
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
