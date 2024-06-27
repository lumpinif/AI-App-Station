"use client"

import { useRef, useState } from "react"
import { ChevronDown, ChevronRight, Construction } from "lucide-react"

import { AppDetails } from "@/types/db_tables"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { InDevNotice } from "@/components/shared/in-dev-notice"

type AppDetailRelevantAppsProps = {
  app: AppDetails
}

export const AppDetailRelevantApps: React.FC<AppDetailRelevantAppsProps> = ({
  app,
}) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2 xl:w-56"
    >
      <div className="flex items-center justify-between">
        <h2
          className="page-title-font text-2xl text-muted-foreground hover:cursor-pointer lg:text-base"
          onClick={() => setIsOpen(!isOpen)}
        >
          More similar to {app.app_title}
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
        <div className="flex w-full items-center justify-between py-10">
          <Construction className="size-6 text-yellow-500 opacity-20 transition-all duration-200 ease-out hover:cursor-not-allowed hover:opacity-100 hover:brightness-100" />
          <span className="text-end text-[0.7rem] text-muted-foreground">
            currently still in active development
          </span>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
