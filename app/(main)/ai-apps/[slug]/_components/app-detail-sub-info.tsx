"use client"

import React, { Suspense } from "react"
import { ChevronDown, ChevronRight, ChevronsUpDown } from "lucide-react"
import moment from "moment"

import { App, Profile } from "@/types/db_tables"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { UserHoverCard } from "./user-hover-card"

type AppDetailSubInfoProps = {
  submitted_by: Profile["full_name"]
  created_at: Profile["created_at"]
  avatar_url: Profile["avatar_url"]
  lastUpdated: App["updated_at"]
}

export const AppDetailSubInfo: React.FC<AppDetailSubInfoProps> = ({
  submitted_by,
  created_at: user_joined,
  avatar_url,
  lastUpdated,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2 lg:w-56"
    >
      <div className="flex items-center justify-between px-2">
        <h4 className="text-base font-medium">About this App</h4>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 rounded-full p-0 transition-all duration-200 ease-out "
          >
            {!isOpen ? (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="flex items-center justify-between rounded-md px-4 py-2 text-sm hover:bg-muted">
          <span className="text-muted-foreground">Submitted By</span>

          <UserHoverCard
            avatar_url={avatar_url}
            user_joined={user_joined}
            user_name={submitted_by}
          />
        </div>
        <div className="flex items-center justify-between rounded-md px-4 py-2 text-sm hover:bg-muted">
          <span className="text-muted-foreground">Last Updated</span>
          <span>{moment(lastUpdated).fromNow()}</span>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
